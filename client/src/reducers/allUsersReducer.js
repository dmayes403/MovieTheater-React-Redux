import { FETCH_ALL_USERS, UPDATE_ALL_USERS } from '../actions/types';

export default function(state = [], action) {
    // ^^ default state to an empty array
    switch (action.type) {
        case FETCH_ALL_USERS:
            return action.payload;
        case UPDATE_ALL_USERS:
            return action.payload.updatedUsers;
        default:
            return state;
    }
}