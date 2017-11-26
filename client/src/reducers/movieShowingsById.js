import { MOVIE_SHOWING_BY_ID } from './types';

export default function(state = [], action) {
    // ^^ default state to an empty array
    switch (action.type) {
        case MOVIE_SHOWING_BY_ID:
            return action.payload;
        default:
            return state;
    }
}