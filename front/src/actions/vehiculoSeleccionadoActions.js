import {
    VEHICLE_SELECTED,
    VEHICLE_DESELECTED
} from '../types'

//Selección de usuario
export function vehicleSelectedSet(data){    
    return (dispatch)=>{
        dispatch(vehicleSelected(data))
    }
}
const vehicleSelected = (data)=>({
    type: VEHICLE_SELECTED,
    payload : data
})

//Deselección de usuario
export function vehicleDeselectedSet(data){    
    return (dispatch)=>{
        dispatch(vehicleDeselected(data))
    }
}
const vehicleDeselected = (data)=>({
    type: VEHICLE_DESELECTED,
    payload : null
})
