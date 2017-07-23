import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: action.error, password: '', loading: false };
        case LOGOUT_USER:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};
