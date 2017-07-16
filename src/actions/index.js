import database from '../firebase';
import { 
    FETCH_CLIENTS
} from './types';

 export function fetchClients(){
    return (dispatch) => {
         database.ref('/clients')
            .on('value', snapshot => {
            dispatch({
                type: FETCH_CLIENTS,
                payload: snapshot.val()
            });
        }); 
    };
}