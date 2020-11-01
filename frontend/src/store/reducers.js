import { ActionTypes } from './actions';

const initialState = {
    user_id: null,
    clock_in: null,
    clock_out: null,        
};


const reducer = (state = initialState, action) => {
    
    switch(action.type) {
        case ActionTypes.SET_USER:            
            return {
                ...state,
                user_id: action.payload
            };        

        case ActionTypes.CLOCK_IN:
            return {
                ...state,
                clock_in: action.payload
            }            

        case ActionTypes.CLOCK_OUT:
            return {
                ...state,
                clock_out: action.payload
            }

        case ActionTypes.RESET_STATE:            
            return {
                user_id: null,
                clock_in: null,
                clock_out: null
            }            

        default:
            return state;
    }

}

export default reducer;