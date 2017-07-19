import {
	database,
	baseRoot,
} from '../firebase';
import {
	FETCH_PROJECTS,
	FETCH_PROJECTS_SUCCESS,
	FETCH_PROJECTS_FAIL,
	FETCH_PROJECT_DETAILS,
	FETCH_PROJECT_DETAILS_SUCCESS,
	FETCH_PROJECT_DETAILS_FAIL,
} from './types';

const projectsRoot= `${baseRoot}/projects`;
//const clientsRoot = `${baseRoot}/clients`;
const projectsRegsRoot = `${baseRoot}/projectsRegistrations`;

export function fetchProjects() {
	return (dispatch) => {
	dispatch({
			type: FETCH_PROJECTS
		});	
		// Fetching projects
		database.ref(projectsRoot)
			.once('value')
			.then(
				// success
				snap => {
					let projects = { ...snap.val() };
					dispatch({
						type: FETCH_PROJECTS_SUCCESS,
						payload: projects
					})
				}, 
				// error
				error => {
					dispatch({
						type: FETCH_PROJECTS_FAIL,
						error: 'There has been an error retieving the projects list!'
					})
				}); 
	};
};






/* const projectsRegistrationsRef = `${baseRoot}/projectsRegistrations`;
const registrationsRef = `${baseRoot}/registrations`;
const projectKey = '01'; */


 

export function __projectDetails(key) {
	return (dispatch) => {
		dispatch({
			type: FETCH_PROJECT_DETAILS
		});
	}
};




export function projectDetails(key) {
	return (dispatch) => {
	dispatch({
			type: FETCH_PROJECT_DETAILS
		});	
		// Fetching client's details
		database.ref(projectsRoot).child(key)
			.once('value', 
			// success
			snap => 
			{
				// Creating new container Objct
				let projectDetails = {...snap.val(), registrations: {} };				

				 // Fetching all Client's Projects
				database.ref(projectsRegsRoot).child(key)				
					.once('value')
					.then( snap => {
						projectDetails = { ...projectDetails, registrations: snap.val()}
						dispatch({
							type: FETCH_PROJECT_DETAILS_SUCCESS,
							key: key,
							payload: projectDetails
						}); 
					});
				   
			},
			// error
			error => {
				  dispatch({
					type: FETCH_PROJECT_DETAILS_FAIL,
					error: 'There has been an error retieving the project!'
				})  
			}
		);

	};
};



/* 
export function projectDetails(key) {
	let projectDetails = {};
	let registrations = {};
	return (dispatch) => {
		dispatch({
			type: FETCH_PROJECT_DETAILS
		});
		database.ref(projectsRegistrationsRef).child(projectKey)
			.once('value', 
			// success
			snap => 
			{
				projectDetails = {...snap.val()};
				
			},
			// error
			error => {
				dispatch({
					type: FETCH_PROJECT_DETAILS_FAIL,
					error: 'There has been an error retieving the project!'
				})
			}
		);
			

	};
};
 */