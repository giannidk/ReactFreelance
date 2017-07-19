import {
	database,
	baseRoot,
} from '../firebase';

import {
    FETCH_REGISTRATIONS,
    FETCH_REGISTRATIONS_SUCCESS,
    FETCH_REGISTRATIONS_FAIL,
    FETCH_REGISTRATIONS_DETAILS,
    FETCH_REGISTRATIONS_DETAILS_SUCCESS,
    FETCH_REGISTRATIONS_DETAILS_FAIL,
    REGISTRATIONS_ADD
} from './types';

const regsRoot = `${baseRoot}/registrations`;
const projectsRoot = `${baseRoot}/projects`;
const projectsRegsRoot = `${baseRoot}/projectsRegistrations`;

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



 /* export function fetchRegistrations() {
    return (dispatch) => {
        dispatch({
            type: FETCH_REGISTRATIONS,
        });
        database.ref(projectsRegsRoot)
        .once('value')
        .then(
            //success
            snap => {

                // projects
                console.log('Projects Regs: ', snap.val());

                // Projects
                snap.forEach( projectSnap => {
                    console.log('Project Key: ', projectSnap.key);
                    // Query Projec's data
                     database.ref(projectsRoot).child(projectSnap.key)
                    .once('value')
                    .then(
                        projectDataSnap => {
                            // Display Projects Data
                            console.log('Project Data: ', (projectDataSnap.key), projectDataSnap.val().projectName);

                            
                        }
                    ) 
                })

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
}  */




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
        const calcTotal = (hours, minutes, price ) => {
            let total = 0;
            total = (parseInt(hours)*60 + parseInt(minutes))*price;
            return total;
        }

        const totalTime = parseInt(values.hours)*60+parseInt(values.minutes);
        const totalPrice = (totalTime/60)*parseFloat(values.price).toFixed(2);
        console.log(totalTime);

		database.ref(regsRoot)
			.push({ ...values, status: 'open', time: totalTime, total: totalPrice})
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