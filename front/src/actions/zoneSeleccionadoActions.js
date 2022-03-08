import {
    ZONE_SELECTED,
    ZONE_DESELECTED
} from '../types'

//Selección de usuario
export function zoneSelectedSet(data){    
    return (dispatch)=>{
        dispatch(zoneSelected(data))
    }
}
const zoneSelected = (data)=>({
    type: ZONE_SELECTED,
    payload : data
})

//Deselección de usuario
export function zoneDeselectedSet(data){    
    return (dispatch)=>{
        dispatch(zoneDeselected(data))
    }
}
const zoneDeselected = (data)=>({
    type: ZONE_DESELECTED,
    payload : null
})
