import {
    GARAGE_SELECTED,
    GARAGE_DESELECTED
} from '../types'

//Selección de garage
export function garageSelectedSet(data){    
    return (dispatch)=>{
        dispatch(garageSelected(data))
    }
}
const garageSelected = (data)=>({
    type: GARAGE_SELECTED,
    payload : data
})

//Deselección de garage
export function garageDeselectedSet(data){    
    return (dispatch)=>{
        dispatch(garageDeselected(data))
    }
}
const garageDeselected = (data)=>({
    type: GARAGE_DESELECTED,
    payload : null
})
