import {
    ZONE_SELECTED,
    ZONE_DESELECTED
} from '../types'

//Cada reducer tiene su propio state

const initialState = {
    zoneSelected : null,
    stateZoneSelection: false
}

export default function zoneSelected(state = initialState, action){
    switch(action.type){
        case ZONE_SELECTED:
            return{
                ...state,
                zoneSelected: action.payload,
                stateZoneSelection: true
            }
        case ZONE_DESELECTED:
            return{
                ...state,
                zoneSelected: action.payload,
                stateZoneSelection: false
            }

        default:
            return state;
        
    }
}