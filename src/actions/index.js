import database from '../firebase';
import { 
    FETCH_CLIENTS,
    ADD_CLIENT
} from './types';

 export function fetchClients(callbackFunction){
    return (dispatch) => {
         database.ref('/clients')
            .on('value', snapshot => {
            dispatch({
                type: FETCH_CLIENTS,
                payload: snapshot.val()
            });  
            callbackFunction();           
        }); 
    };
}


export function addClient(values, callbackFunction) {
   return (dispatch) => {
        database.ref('/clients')
        .push(values)
        .then(() => {
            dispatch({ 
                type: ADD_CLIENT,
                payload: {}
            }); 
            callbackFunction();       
        }); 
    }; 
}