import {
    ACTION_SET,
    SUBACTION_SET,
    RESET_ALL
} from '../types/actionStatusTypes'

//Cada reducer tiene su propio state

const initialState = {
    stateAction : 'Home',
    stateSubAction: ''
}

export default function zoneSelected(state = initialState, action){
    switch(action.type){
        case ACTION_SET:
            return{
                ...state,
                stateAction: action.payload,
            }
        case SUBACTION_SET:
            return{
                ...state,
                stateSubAction: action.payload,
            }
        case RESET_ALL:
            return{
                ...state,
                stateAction : action.payload,
                stateSubAction: '',
            }
        default:
            return state;
        
    }
}