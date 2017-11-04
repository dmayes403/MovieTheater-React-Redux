import { combineReducers } from 'redux';
import { reducer as reduxForm} from 'redux-form';
import movieSearchResults from './movieSearchReducer';
import movieDetails from './movieDetailsReducer';

export default combineReducers({
    form: reduxForm,
    movieSearchResults: movieSearchResults,
    movieDetails: movieDetails
});