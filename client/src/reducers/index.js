import { combineReducers } from 'redux';
import { reducer as reduxForm} from 'redux-form';
import movieSearchResults from './movieSearchReducer';

export default combineReducers({
    form: reduxForm,
    movieSearchResults: movieSearchResults
});