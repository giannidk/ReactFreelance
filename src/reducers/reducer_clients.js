import { 
    FETCH_CLIENTS
} from '../actions/types';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_CLIENTS:
            return action.payload;        
        default: 
            return state;
    }
}
