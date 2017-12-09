import axios from 'axios';
import _ from 'lodash';
import { 
    FETCH_USER,
    SEARCH_MOVIES, 
    MOVIE_DETAILS, 
    THEATER_LIST, 
    THEATER_DELETE,
    MOVIE_SHOWINGS,
    MOVIE_SHOWING_BY_ID ,
    FETCH_ALL_USERS
    } from './types';

const movieDBKEY = process.env.REACT_APP_MOVIE_DB_KEY;

export const fetchUser = () => async dispatch => {
    // if fetchUser is calling a function, redux-thunk will *automatically*
    // pass in *dispatch* as an argument
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const searchMovies = (movieTitle) => async dispatch => {
    if (movieTitle === 'searchMovieDefault') {
        let movieBaseUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${movieDBKEY}&language=en-US`;
        
        const res = await axios.get(movieBaseUrl);
        const movies = res.data.results.filter(movie => {
            if (movie.poster_path) {
                return movie;
            } else {
                return false;
            }
        });
        const pageData = {};
        pageData.page = 1;
        pageData.page_totals = 1;

        dispatch({ type: SEARCH_MOVIES, payload: { movies: movies, pageData: pageData }});
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
            movieBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKEY}&language=en-US&query=${alteredMovieTitle}&page=1`;
        } else {
            movieBaseUrl = `https://api.themoviedb.org/3/search/movie?api_key=${movieDBKEY}&language=en-US&query=${movieTitle}&page=1`;
        }
        const res = await axios.get(movieBaseUrl);
        const movies = res.data.results.filter(movie => {
            if (movie.poster_path) {
                return movie;
            } else {
                return false;
            }
        });

        const pageData = {};
        pageData.page = res.data.page;
        pageData.page_totals = res.data.page_totals;

        dispatch({ type: SEARCH_MOVIES, payload: { movies: movies, pageData: pageData }});
    }
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

export const saveShowing = (showDetails, history) => async dispatch => {
    axios.post('/api/newShowing', showDetails).then(() => {
        history.push('/');
    })
}

export const getShowings = () => async dispatch => {
    let movieDetails = [];
    let showings = await axios.get('/api/showings');

    showings.data.reverse().forEach((showing, index) => {
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
                dispatch({type: MOVIE_SHOWINGS, payload: {showings: showings.data, movieDetails: movieDetails}});
            }
        }));
    });
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
    dispatch({ type: FETCH_ALL_USERS, payload: savedUsers.data });
}

export const saveTheater = (theater) => async dispatch => {
    const savedTheaters = await axios.post(`/api/theaters`, theater);
    dispatch({ type: THEATER_LIST, payload: savedTheaters.data });
}

export const deleteTheater = (theater) => async dispatch => {
    axios.delete(`/api/theaters/${theater._id}`);
    dispatch({ type: THEATER_DELETE, payload: theater });
}