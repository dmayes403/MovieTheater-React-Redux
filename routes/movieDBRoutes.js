const axios = require('axios');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const moment = require('moment');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys')

module.exports = app => {
    app.get(`/api/movieDetailsById/:id`, requireLogin, async (req, res) => {
        // console.log("id: " + req.body.movieId);
        console.log("id: " + req.params.id);
        console.log("key: " + keys.movieDBKEY);
        const getDetailsURL = `https://api.themoviedb.org/3/movie/${req.body.movieId}?api_key=${keys.movieDBKEY}&language=en-US`;
        const getVideosURL = `https://api.themoviedb.org/3/movie/${req.body.movieId}/videos?api_key=${keys.movieDBKEY}&language=en-US`;
        const getRatingsURL = `https://api.themoviedb.org/3/movie/${req.body.movieId}/release_dates?api_key=${keys.movieDBKEY}&language=en-US`;
    
        axios.all([
            axios.get(getVideosURL),
            axios.get(getRatingsURL),
            axios.get(getDetailsURL)
        ]).then(axios.spread((videos, ratings, details) => {
            const rating = _.find(ratings.data.results, {iso_3166_1: "US"})
            const data = [videos.data.results, rating.release_dates[rating.release_dates.length-1].certification, details.data];
            // dispatch({ type: MOVIE_DETAILS, payload: data });
            console.log("data: " + data);
            res.send(data);
        }));
    })

}