import { combineReducers } from 'redux';
import ClientsReducer from './reducer_clients';

const rootReducer = combineReducers({
    state: (state = {}) => state,
    clients: ClientsReducer
})

export default rootReducer;
