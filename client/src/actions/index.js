import axios from 'axios';
import { SEARCH_MOVIES } from './types';

const movieDBKEY = process.env.REACT_APP_MOVIE_DB_KEY;
const movieBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKEY}&language=en-US&query=star%20wars`;

export const searchMovies = () => async dispatch => {
    const res = await axios.get(movieBaseUrl);
    console.log(res)
    console.log(res.data)
    dispatch({ type: SEARCH_MOVIES, payload: res.data.results });
};