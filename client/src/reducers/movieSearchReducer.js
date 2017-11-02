import { SEARCH_MOVIES } from '../actions/types';


export default function(state = [], action) {
    // ^^ default state to an empty array
    switch (action.type) {
        case SEARCH_MOVIES:
            return action.payload;
        default:
            return state;
    }
}