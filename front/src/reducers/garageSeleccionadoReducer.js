import {
    GARAGE_SELECTED,
    GARAGE_DESELECTED
} from '../types'

//Cada reducer tiene su propio state

const initialState = {
    garageSelected : null,
    stateGarageSelection: false
}

export default function zoneSelected(state = initialState, action){
    switch(action.type){
        case GARAGE_SELECTED:
            return{
                ...state,
                garageSelected: action.payload,
                stateGarageSelection: true
            }
        case GARAGE_DESELECTED:
            return{
                ...state,
                garageSelected: action.payload,
                stateGarageSelection: false
            }

        default:
            return state;
        
    }
}