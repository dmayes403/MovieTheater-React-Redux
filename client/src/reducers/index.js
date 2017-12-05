import { combineReducers } from 'redux';
import { reducer as reduxForm} from 'redux-form';
import authReducer from './authReducer';
import movieSearchResults from './movieSearchReducer';
import movieDetails from './movieDetailsReducer';
import theaterList from './theaterListReducer';
import movieShowings from './movieShowingsReducer';
import movieShowingsById from './movieShowingsByIdReducer';
import allUsers from './allUsersReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    movieSearchResults: movieSearchResults,
    movieDetails: movieDetails,
    theaterList: theaterList,
    movieShowings: movieShowings,
    movieShowingsById: movieShowingsById,
    allUsers: allUsers
});