import { MOVIE_DETAILS } from '../actions/types';

export default function(state = [], action) {
    console.log(action.payload);
    // ^^ default state to an empty array
    switch (action.type) {
        case MOVIE_DETAILS:
            return action.payload;
        default:
            return state;
    }
}