import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ClientsReducer from './reducer_clients';
import ProjectsReducer from './reducer_projects';
import RegistrationsReducer from './reducer_registrations';

const rootReducer = combineReducers({
    appData: () => {
      return {
        "VAT": "25",
        "currency": "DKK"
      }
    },
    clients: ClientsReducer,
    projects: ProjectsReducer,
    registrations: RegistrationsReducer,
    form: formReducer
})

export default rootReducer;
