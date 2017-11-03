import axios from 'axios';
import { SEARCH_MOVIES } from './types';

const movieDBKEY = process.env.REACT_APP_MOVIE_DB_KEY;

export const searchMovies = (movieTitle) => async dispatch => {
    const movieBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKEY}&language=en-US&query=${movieTitle}`;
    const res = await axios.get(movieBaseUrl);
    console.log(res)
    console.log(res.data)
    dispatch({ type: SEARCH_MOVIES, payload: res.data.results });
};