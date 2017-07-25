import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
    userEmail: '',
    userPassword: '',
    error: '',
    loading: false,
    loggedIn: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, userEmail: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, userPassword: action.payload };
        case LOGIN_USER:
            //console.log(state.userEmail, state.userPassword);
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            console.log(action.payload);
            return { ...state, ...INITIAL_STATE, user: action.payload, loggedIn: true };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.error };
        case LOGOUT_USER:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }    
};
