const axios = require('axios');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const moment = require('moment');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const mongoose = require('mongoose');
const ShowTime = mongoose.model('showTimes');

module.exports = app => {
    // get movie details by movie id
    app.get(`/api/movieDetailsById/:id`, requireLogin, async (req, res) => {
        const getDetailsURL = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${keys.movieDBKEY}&language=en-US`;
        const getVideosURL = `https://api.themoviedb.org/3/movie/${req.params.id}/videos?api_key=${keys.movieDBKEY}&language=en-US`;
        const getRatingsURL = `https://api.themoviedb.org/3/movie/${req.params.id}/release_dates?api_key=${keys.movieDBKEY}&language=en-US`;
    
        axios.all([
            axios.get(getVideosURL),
            axios.get(getRatingsURL),
            axios.get(getDetailsURL)
        ]).then(axios.spread((videos, ratings, details) => {
            const rating = _.find(ratings.data.results, {iso_3166_1: "US"})
            const data = [videos.data.results, rating.release_dates[rating.release_dates.length-1].certification, details.data];
            res.send(data);
        }));
    })

    // get movies by keyword search
    app.get(`/api/searchMovies/:movieTitle/:pageNumber`, requireLogin, async (req, res) => {
        const movieTitle = req.params.movieTitle;
        const pageNumber = req.params.pageNumber;

        if (!movieTitle || movieTitle === 'searchMovieDefault') {
            let movieBaseUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${keys.movieDBKEY}&language=en-US&page=${pageNumber}`;
            
            const searchResults = await axios.get(movieBaseUrl);
            const movies = searchResults.data.results.filter(movie => {
                if (movie.poster_path) {
                    return movie;
                } else {
                    return false;
                }
            });
            const pageData = {};
            pageData.page = 1;
            pageData.page_totals = 1;

            payload = { movies: movies, pageData: pageData };
            res.send(payload);
        } else {
            let alteredMovieTitle = '';
            let movieBaseUrl = '';
            if (movieTitle.split(' ').length > 1) {
                for (let i = 0; i < movieTitle.split(' ').length; i++) {
                    alteredMovieTitle += movieTitle.split(' ')[i];
                    if (i < movieTitle.split(' ').length - 1){
                        alteredMovieTitle += '%20';
                    }
                }
                movieBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${keys.movieDBKEY}&language=en-US&query=${alteredMovieTitle}&page=${pageNumber}`;
            } else {
                movieBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${keys.movieDBKEY}&language=en-US&query=${movieTitle}&page=${pageNumber}`;
            }
            const searchResults = await axios.get(movieBaseUrl);
            const movies = searchResults.data.results.filter(movie => {
                if (movie.poster_path) {
                    return movie;
                } else {
                    return false;
                }
            });

            const pageData = {};
            pageData.page = searchResults.data.page;
            pageData.total_pages = searchResults.data.total_pages;

            payload = { movies: movies, pageData: pageData };
            res.send(payload);
        }
    });

    app.get(`/api/getShowings`, requireLogin, async (req, res) => {
        let tempShowTimes = [];
        let movieDetails = [];

        const showings = await ShowTime.find({}, (err, showTimes) => {
            tempShowTimes = showTimes;
        }).then(() => {
            tempShowTimes.reverse().forEach((showing, index) => {
                const getDetailsURL = `https://api.themoviedb.org/3/movie/${showing.movieId}?api_key=${keys.movieDBKEY}&language=en-US`;
                const getVideosURL = `https://api.themoviedb.org/3/movie/${showing.movieId}/videos?api_key=${keys.movieDBKEY}&language=en-US`;
                const getRatingsURL = `https://api.themoviedb.org/3/movie/${showing.movieId}/release_dates?api_key=${keys.movieDBKEY}&language=en-US`;
        
                axios.all([
                    axios.get(getVideosURL),
                    axios.get(getRatingsURL),
                    axios.get(getDetailsURL)
                ]).then(axios.spread((videos, ratings, details) => {
                    const rating = _.find(ratings.data.results, {iso_3166_1: "US"})
                    const data = [videos.data.results, rating.release_dates[rating.release_dates.length-1].certification, details.data];
                    movieDetails.push(data);

                    if (movieDetails.length === tempShowTimes.length) {
                        payload = { showings: tempShowTimes, movieDetails: movieDetails }
                        res.send(payload);
                    }
                    }))
                })
        });
    });
}