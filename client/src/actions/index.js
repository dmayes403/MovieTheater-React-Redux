import axios from 'axios';
import _ from 'lodash';
import { 
    SEARCH_MOVIES, 
    MOVIE_DETAILS, 
    THEATER_LIST, 
    MOVIE_SHOWINGS,
    DASHBOARD_DETAILS,
    MOVIE_SHOWING_BY_ID 
    } from './types';

const movieDBKEY = process.env.REACT_APP_MOVIE_DB_KEY;

export const searchMovies = (movieTitle) => async dispatch => {
    let alteredMovieTitle = '';
    let movieBaseUrl = '';
    if (movieTitle.split(' ').length > 1) {
        for (let i = 0; i < movieTitle.split(' ').length; i++) {
            alteredMovieTitle += movieTitle.split(' ')[i];
            if (i < movieTitle.split(' ').length - 1){
                alteredMovieTitle += '%20';
            }
        }
        movieBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKEY}&language=en-US&query=${alteredMovieTitle}`;
    } else {
        movieBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKEY}&language=en-US&query=${movieTitle}`;
    }
    const res = await axios.get(movieBaseUrl);
    const movies = res.data.results.filter(movie => {
        if (movie.poster_path) {
            return movie;
        } else {
            return false;
        }
    })
    dispatch({ type: SEARCH_MOVIES, payload: movies });
};

export const getMovieDetails = (movieId) => async dispatch => {
    const getDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieDBKEY}&language=en-US`;
    const getVideosURL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${movieDBKEY}&language=en-US`;
    const getRatingsURL = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${movieDBKEY}&language=en-US`;

    axios.all([
        axios.get(getVideosURL),
        axios.get(getRatingsURL),
        axios.get(getDetailsURL)
    ]).then(axios.spread((videos, ratings, details) => {
        const rating = _.find(ratings.data.results, {iso_3166_1: "US"})
        const data = [videos.data.results, rating.release_dates[rating.release_dates.length-1].certification, details.data];
        dispatch({ type: MOVIE_DETAILS, payload: data });
    }));

}

export const getTheaterList = () => async dispatch => {
    const theaters = await axios.get('/api/theaters');
    dispatch({ type: THEATER_LIST, payload: theaters.data })
}

export const saveShowing = (showDetails) => async dispatch => {
    const res = await axios.post('/api/newShowing', showDetails);
}

export const getShowings = () => async dispatch => {
    let movieDetails = [];
    const showings = await axios.get('/api/showings');

    showings.data.forEach((showing, index) => {
        const getDetailsURL = `https://api.themoviedb.org/3/movie/${showing.movieId}?api_key=${movieDBKEY}&language=en-US`;
        const getVideosURL = `https://api.themoviedb.org/3/movie/${showing.movieId}/videos?api_key=${movieDBKEY}&language=en-US`;
        const getRatingsURL = `https://api.themoviedb.org/3/movie/${showing.movieId}/release_dates?api_key=${movieDBKEY}&language=en-US`;

        axios.all([
            axios.get(getVideosURL),
            axios.get(getRatingsURL),
            axios.get(getDetailsURL)
        ]).then(axios.spread((videos, ratings, details) => {
            const rating = _.find(ratings.data.results, {iso_3166_1: "US"})
            const data = [videos.data.results, rating.release_dates[rating.release_dates.length-1].certification, details.data];
            movieDetails.push(data);

            if (index === showings.data.length - 1) {
                // console.log({showings: showings.data, movieDetails: movieDetails});
                dispatch({type: MOVIE_SHOWINGS, payload: {showings: showings.data, movieDetails: movieDetails}});
            }
        }));
    });
}

export const getShowingsById = (id) => async dispatch => {
    const showings = await axios.get(`/api/showingsById/${id}`);
    console.log(showings.data);
    dispatch({ type: MOVIE_SHOWING_BY_ID, payload: showings.data })
}