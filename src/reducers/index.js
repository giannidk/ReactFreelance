import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ClientsReducer from './reducer_clients';
import ProjectsReducer from './reducer_projects';

const rootReducer = combineReducers({
    clients: ClientsReducer,
    projects: ProjectsReducer,
    form: formReducer
})

export default rootReducer;
