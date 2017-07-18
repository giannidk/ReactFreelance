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

const projectsRegistrationsRef = `${baseRoot}/projectsRegistrations`;
const registrationsRef = `${baseRoot}/registrations`;
const projectKey = '01';


   export function fetchProjects() {
	return (dispatch) => {
		dispatch({
			type: FETCH_PROJECTS
		});
		database.ref(projectsRoot)
			.once('value')
			.then(
				// success
				snapshot => {
					dispatch({
						type: FETCH_PROJECTS_SUCCESS,
						payload: snapshot.val()
					})
				},
				// error
				error => {
					dispatch({
						type: FETCH_PROJECTS_FAIL,
						error: 'There has been an error retieving the projects list!'
					})
				}
			);
	};
}   



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
