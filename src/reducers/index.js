import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ClientsReducer from './reducer_clients';

const rootReducer = combineReducers({
    clients: ClientsReducer,
    form: formReducer
})

export default rootReducer;
