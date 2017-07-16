import { 
    FETCH_CLIENTS,
    ADD_CLIENT
} from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_CLIENTS:
            return { ...state, list: action.payload};  
        case ADD_CLIENT:
            return action.payload;      
        default: 
            return state;
    }
}
