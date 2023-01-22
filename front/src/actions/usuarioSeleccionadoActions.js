import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

import {
    USER_SELECTED,
    USER_DESELECTED
} from '../types'

//Selección de usuario
export function userSelectedSet(data){    
    return (dispatch)=>{
        dispatch(userSelected(data))
    }
}
const userSelected = (updateData)=>({
    type: USER_SELECTED,
    payload : updateData
})

//Deselección de usuario
export function userDeselectedSet(data){    
    return (dispatch)=>{
        dispatch(userDeselected(data))
    }
}
const userDeselected = (updateData)=>({
    type: USER_DESELECTED,
    payload : null
})
