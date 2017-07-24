import firebase from 'firebase';
import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER
} from './types';


export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ userEmail, userPassword }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => {
                loginUserFail(dispatch);
            });
    };
};

const loginUserFail = (dispatch) => {
    dispatch({ 
        type: LOGIN_USER_FAIL,
        error: 'Authentication failed!' 
    });
};
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_USER,
            payload: {}        
        });
    };
};


/* 
export const loginUser = ({ userEmail, userPassword }, callbackFunction) => {
    return (dispatch) => {
      console.log(userEmail, userPassword);
         dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
            .then(              
              user => {
              loginUserSuccess(dispatch, user);
              callbackFunction('/dashboard');
              console.log('OK');
              }
            )
            .catch((error) => {
                console.log(error);
                dispatch({ 
                  type: LOGIN_USER_FAIL,
                  error: 'Authentication failed!'
                });
              //callbackFunction('/');
            }); 
    };
};

export const logoutUser = (callbackFunction) => {
        console.log('CICCIO');
    return (dispatch) => {
        console.log('user');
        firebase.auth().signOut();
        dispatch({
            type: LOGOUT_USER,
            payload: {}
        });
          callbackFunction('/dashboard');
    };
};

// HELPER FUNCTIONS
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};
 */