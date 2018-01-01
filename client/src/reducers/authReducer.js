import { FETCH_USER, UPDATE_ALL_USERS } from '../actions/types';

export default function(state = null, action) {
    // ^^ it's important to initialize state as null
    switch(action.type) {
        case FETCH_USER:
            return action.payload || false;
        case UPDATE_ALL_USERS:
            return action.payload.currentUser;
        default:
            return state;
    }
} 