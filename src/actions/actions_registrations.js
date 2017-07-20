import {
	database,
  registrationsRoot as regsRoot,
  projectsRegistrationsRoot as projectsRegsRoot
} from '../firebase';

import {
    FETCH_REGISTRATIONS,
    FETCH_REGISTRATIONS_SUCCESS,
    FETCH_REGISTRATIONS_FAIL,
    FETCH_REGISTRATIONS_DETAILS,
    FETCH_REGISTRATIONS_DETAILS_SUCCESS,
    FETCH_REGISTRATIONS_DETAILS_FAIL,
    REGISTRATIONS_ADD,
    REGISTRATION_DELETE
} from './types';

 export function fetchRegistrations() {
    return (dispatch) => {
        dispatch({
        type: FETCH_REGISTRATIONS,
    });
        database.ref(regsRoot)
        .once('value')
        .then(
            //success
            snap => {
                dispatch({
                    type: FETCH_REGISTRATIONS_SUCCESS,
					payload: snap.val()
                });
            },
            error => {
                dispatch({
                    type: FETCH_REGISTRATIONS_FAIL,
					error: 'Registrations could not be retrieved!'
                });
            }
        )
    }
} 

export function registrationDetails(key) {
	return (dispatch) => {
	dispatch({
			type: FETCH_REGISTRATIONS_DETAILS
		});	
		// Fetching registrations's details
		database.ref(regsRoot).child(key)
			.once('value', 
			// success
			snap => 
			{
				dispatch({
            type: FETCH_REGISTRATIONS_DETAILS_SUCCESS,
            key: key,
            payload: snap.val()
        }); 
				   
			},
			// error
			error => {
				  dispatch({
					type: FETCH_REGISTRATIONS_DETAILS_FAIL,
					error: 'There has been an error retieving the selected registration!'
				})  
			}
		);

	};
};



export function addRegistration(values, callbackFunction) {
	return (dispatch) => {
        const totalTime = parseInt(values.hours, 10)*60+parseInt(values.minutes, 10);
        console.log('HOURS: ',typeof values.hours, values.hours);
        console.log('MINUTES: ',typeof values.hours, values.minutes);
        const totalPrice = (totalTime/60)*parseFloat(values.price).toFixed(2);
        console.log(totalTime);

		database.ref(regsRoot)
			.push({ ...values, status: 'open', total: totalPrice})
			.then( snap => {
                console.log(snap.getKey());
                database.ref(projectsRegsRoot).child(values.project).child(snap.getKey())
                .set(values.name)
                .then(
                    // success
                    () => {
                        dispatch({
                            type: REGISTRATIONS_ADD,
                            payload: {}
                        });
                    }
                )				
				callbackFunction();
			});
	};
}


export function registrationDelete(id, projectKey, callbackFunction) {
  return (dispatch) => {
      // remove from relational table
    database.ref(`${projectsRegsRoot}/${projectKey}`)
    .remove()
    .then(
        success => {
        // Success -> Then Remove from registrations table
        database.ref(`${regsRoot}/${id}`)
        .remove()
        .then(
            success => {
                // send dispatch
                dispatch({ 
                    type: REGISTRATION_DELETE,
                    payload: id
                }); 
            },
            error => {
                console.log('ERROR');
            },
        )
        callbackFunction();   
        }, 
        error => {
            console.log('ERROR');
        },
    );
  };
}
