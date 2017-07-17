import { 
    FETCH_CLIENTS,
    FETCH_CLIENTS_SUCCESS,
    FETCH_CLIENTS_FAIL,
    ADD_CLIENT,
    CLIENT_DELETE,
    CLIENT_DETAILS
} from '../actions/types';

const INITIAL_STATE = {
    clients: {},
    error: null,
    loading: false
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_CLIENTS:
            return { ...state, loading: true };  
        case FETCH_CLIENTS_SUCCESS:
            return { ...state, list: action.payload, error: null, loading: false };  
        case FETCH_CLIENTS_FAIL:
            return { ...state, error: action.error, loading: false };  
        case CLIENT_DETAILS:
            return { ...state, [action.key]: action.payload };
        case ADD_CLIENT:
            return action.payload;   
        case CLIENT_DELETE:
            return action.payload;   
        default: 
            return state;
    }
}
