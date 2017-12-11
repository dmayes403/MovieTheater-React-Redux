import { MOVIE_SHOWINGS } from '../actions/types';

export default function(state = { showings: [], movieDetails: [] }, action) {
// export default function(state = [], action) {
    // ^^ default state to an empty array
    switch (action.type) {
        case MOVIE_SHOWINGS:
            return action.payload;
        default:
            return state;
    }
}