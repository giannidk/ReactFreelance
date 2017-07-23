import firebase from 'firebase';
import { 
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    LOGOUT_USER
} from './types';



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
