import { THEATER_LIST, THEATER_DELETE } from '../actions/types';

export default function(state = [], action) {
    // ^^ default state to an empty array
    switch (action.type) {
        case THEATER_LIST:
            return action.payload;
        case THEATER_DELETE:
            const newState = Object.assign([], state);
            const indexOfTheaterToDelete = state.findIndex(theater => {
                return theater._id === action.payload._id;
            });
            newState.splice(indexOfTheaterToDelete, 1);
            
            return newState;
        default:
            return state;
    }
}