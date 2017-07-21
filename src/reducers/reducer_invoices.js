import { 
  SAVE_INVOICE,
	SAVE_INVOICE_SUCCESS,
  SAVE_INVOICE_FAIL,
  FETCH_INVOICES,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAIL,
  FETCH_INVOICES_DETAILS,
  FETCH_INVOICES_DETAILS_SUCCESS,
  FETCH_INVOICES_DETAILS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    invoices: {},
    error: null,
    loading: false
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_INVOICES:
            return { ...state, loading: true }; 
        case FETCH_INVOICES_SUCCESS:        
            return { ...state, list: action.payload, error: null, loading: false };
        case FETCH_INVOICES_FAIL:
            return { ...state, error: action.error, loading: false };  
        case FETCH_INVOICES_DETAILS:
            return { ...state, loading: true }; 
        case FETCH_INVOICES_DETAILS_SUCCESS:
            console.log(action.payload);
            return { ...state, [action.key]: action.payload, loading: false };
        case FETCH_INVOICES_DETAILS_FAIL:
            return { ...state, error: action.error, loading: false }; 
        /*
        case REGISTRATION_DELETE:
            return action.payload; 
        */  
        case SAVE_INVOICE:
            return action.payload;   
        default: 
            return state;
    }
}
