import axios from 'axios';
import { 
    FETCH_USER,
    SEARCH_MOVIES, 
    MOVIE_DETAILS, 
    THEATER_LIST, 
    THEATER_DELETE,
    MOVIE_SHOWINGS,
    MOVIE_SHOWING_BY_ID,
    FETCH_ALL_USERS,
    UPDATE_ALL_USERS
    } from './types';

export const fetchUser = () => async dispatch => {
    // if fetchUser is calling a function, redux-thunk will *automatically*
    // pass in *dispatch* as an argument
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const searchMovies = (movieTitle, pageNumber) => async dispatch => {
    const res = await axios.get(`/api/searchMovies/${movieTitle}/${pageNumber}`);
    dispatch({ type: SEARCH_MOVIES, payload: { movies: res.data.movies, pageData: res.data.pageData }});
};

export const getMovieDetails = (movieId) => async dispatch => {
    const movieDetails = await axios.get(`/api/movieDetailsById/${movieId}`);
    dispatch({ type: MOVIE_DETAILS, payload: movieDetails.data });
}

export const getTheaterList = () => async dispatch => {
    const theaters = await axios.get('/api/theaters');
    dispatch({ type: THEATER_LIST, payload: theaters.data })
}

export const saveShowing = (showDetails, history) => async dispatch => {
    axios.post('/api/newShowing', showDetails).then(() => {
        history.push('/');
    })
}

export const getShowings = () => async dispatch => {
    const res = await axios.get(`/api/getShowings`);
    dispatch({type: MOVIE_SHOWINGS, payload: {showings: res.data.showings, movieDetails: res.data.movieDetails}});
}

export const getShowingsById = (id) => async dispatch => {
    const showings = await axios.get(`/api/showingsById/${id}`);
    dispatch({ type: MOVIE_SHOWING_BY_ID, payload: showings.data })
}

export const deleteShowing = (id, history) => async dispatch => {
    axios.delete(`/api/showing/${id}`).then(() => {
        history.push('/');
    });
}

export const getAllUsers = () => async dispatch => {
    const users = await axios.get(`/api/users`);
    dispatch({ type: FETCH_ALL_USERS, payload: users.data });
}

export const updateUsers = (updatedUsers) => async dispatch => {
    const savedUsers = await axios.post(`/api/users`, updatedUsers);
    // this sends back the updated users and also the updated current user for authentication
    dispatch({ type: UPDATE_ALL_USERS, payload: savedUsers.data });
}

export const saveTheater = (theater) => async dispatch => {
    const savedTheaters = await axios.post(`/api/theaters`, theater);
    dispatch({ type: THEATER_LIST, payload: savedTheaters.data });
}

export const deleteTheater = (theater) => async dispatch => {
    axios.delete(`/api/theaters/${theater._id}`);
    dispatch({ type: THEATER_DELETE, payload: theater });
}