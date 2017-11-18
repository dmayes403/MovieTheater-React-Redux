import { combineReducers } from 'redux';
import { reducer as reduxForm} from 'redux-form';
import movieSearchResults from './movieSearchReducer';
import movieDetails from './movieDetailsReducer';
import theaterList from './theaterListReducer';
import movieShowings from './movieShowings';

export default combineReducers({
    form: reduxForm,
    movieSearchResults: movieSearchResults,
    movieDetails: movieDetails,
    theaterList: theaterList,
    movieShowings: movieShowings
});