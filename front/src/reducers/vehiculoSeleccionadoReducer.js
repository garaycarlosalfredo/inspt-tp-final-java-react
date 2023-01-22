import {
    VEHICLE_SELECTED,
    VEHICLE_DESELECTED
} from '../types'

//Cada reducer tiene su propio state

const initialState = {
    vehicleSelected : null,
    stateVehicleSelection: false
}

export default function vehicleSelected(state = initialState, action){
    switch(action.type){
        case VEHICLE_SELECTED:
            return{
                ...state,
                vehicleSelected: action.payload,
                stateVehicleSelection: true
            }
        case VEHICLE_DESELECTED:
            return{
                ...state,
                vehicleSelected: action.payload,
                stateVehicleSelection: false
            }

        default:
            return state;
        
    }
}