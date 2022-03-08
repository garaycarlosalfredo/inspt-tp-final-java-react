import {
    USER_SELECTED,
    USER_DESELECTED
} from '../types'

//Cada reducer tiene su propio state

const initialState = {
    userSelected : null,
    stateUserSelection: false
}

export default function userSelected(state = initialState, action){
    switch(action.type){
        case USER_SELECTED:
            return{
                ...state,
                userSelected: action.payload,
                stateUserSelection: true
            }
        case USER_DESELECTED:
            return{
                ...state,
                userSelected: action.payload,
                stateUserSelection: false
            }

        default:
            return state;
        
    }
}