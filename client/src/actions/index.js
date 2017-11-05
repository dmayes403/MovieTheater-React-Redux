import axios from 'axios';
import { SEARCH_MOVIES, MOVIE_DETAILS } from './types';

const movieDBKEY = process.env.REACT_APP_MOVIE_DB_KEY;

export const searchMovies = (movieTitle) => async dispatch => {
    const movieBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKEY}&language=en-US&query=${movieTitle}`;
    const res = await axios.get(movieBaseUrl);
    console.log(res.data.results)
    dispatch({ type: SEARCH_MOVIES, payload: res.data.results });
};

export const getMovieDetails = (movieId) => async dispatch => {
    const getDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${movieDBKEY}&language=en-US`
    const getVideosURL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${movieDBKEY}&language=en-US`
    const getRatingsURL = `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${movieDBKEY}&language=en-US`

    const details = await axios.get(getDetailsURL);
    const videos = await axios.get(getVideosURL);
    const ratings = await axios.get(getRatingsURL);
    console.log(details);
    console.log(videos);
    console.log(ratings);
    // dispatch({ type: MOVIE_DETAILS, payload: res.data.results });

}