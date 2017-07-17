import database from '../firebase';
import {
	FETCH_CLIENTS,
	FETCH_CLIENTS_SUCCESS,
	FETCH_CLIENTS_FAIL,
	ADD_CLIENT,
	CLIENT_DELETE,
    CLIENT_DETAILS
} from './types';

export function fetchClients() {
	return (dispatch) => {
		dispatch({
			type: FETCH_CLIENTS
		});
		database.ref('/clients')
			.orderByValue()
			.once('value')
			.then(
				snapshot => {
					dispatch({
						type: FETCH_CLIENTS_SUCCESS,
						payload: snapshot.val()
					})
				},
				error => {
					dispatch({
						type: FETCH_CLIENTS_FAIL,
						error: 'There has been an error retieving the clients list!'
					})
				}
			);
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

export function clientDetails(key) {
	return (dispatch) => {
		database.ref(`/clients/${key}`)
			.once('value')
			.then(                
				snapshot => {
					//console.log(snapshot.val());
					dispatch({
						type: CLIENT_DETAILS,
						key: key,
						payload: snapshot.val()
					});
                },
                error => {
                    console.log('Error fetching clients data.....');
                }
			)

	};
};


export function clientDelete(id, callbackFunction) {
    return (dispatch) => {
         database.ref(`/clients/${id}`)
            .remove()
            .then(() => {
				dispatch({ 
					type: CLIENT_DELETE,
					payload: id
				}); 
            callbackFunction();       
        }); 
    };
} 
