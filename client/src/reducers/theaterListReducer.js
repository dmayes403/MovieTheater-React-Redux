import { THEATER_LIST } from '../actions/types';

export default function(state = [], action) {
    // ^^ default state to an empty array
    switch (action.type) {
        case THEATER_LIST:
            return action.payload;
        default:
            return state;
    }
}