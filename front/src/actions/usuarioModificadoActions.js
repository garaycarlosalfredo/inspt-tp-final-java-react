import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

import {
    SIGNIN,
    SIGNOUT,
    SIGNIN_SUCCESS,
    USER_ADMIN,
    UPDATE_USER,
    SIGNIN_ERROR,
    USER_UPDATE_USERNAME,
    USER_UPDATE_DNI,
    USER_UPDATE_EMAIL,
    USER_UPDATE_PHONE,
    USER_UPDATE_NAME,
    USER_UPDATE_LASTNAME,
    USER_UPDATE_EROLES,
    USER_UPDATE_USERLIST
} from '../types'

export function updateUserListSet(data){    
    return (dispatch)=>{
        dispatch(updateUserList(data))
    }
}

export function updateUserNameSet(data){    
    return (dispatch)=>{
        dispatch(updateUserName(data))
    }
}
export function updateDniSet(data){    
    return (dispatch)=>{
        dispatch(updateDni(data))
    }
}
export function updateEmailSet(data){    
    return (dispatch)=>{
        dispatch(updateEmail(data))
    }
}
export function updatePhoneSet(data){    
    return (dispatch)=>{
        dispatch(updatePhone(data))
    }
}
export function updateNameSet(data){    
    return (dispatch)=>{
        dispatch(updateName(data))
    }
}
export function updateLastNameSet(data){    
    return (dispatch)=>{
        dispatch(updateLastName(data))
    }
}
export function updateRolesSet(data){    
    return (dispatch)=>{
        dispatch(updateRoles(data))
    }
}



const updateUserList = (updateData)=>({
    type: USER_UPDATE_USERLIST,
    payload : updateData
})

const updateUserName = (updateData)=>({
    type: USER_UPDATE_USERNAME,
    payload : updateData
})
const updateDni = (updateData)=>({
    type: USER_UPDATE_DNI,
    payload : updateData
})
const updateEmail = (updateData)=>({
    type: USER_UPDATE_EMAIL,
    payload : updateData
})
const updatePhone = (updateData)=>({
    type: USER_UPDATE_PHONE,
    payload : updateData
})
const updateName = (updateData)=>({
    type: USER_UPDATE_NAME,
    payload : updateData
})
const updateLastName = (updateData)=>({
    type: USER_UPDATE_LASTNAME,
    payload : updateData
})
const updateRoles = (updateData)=>({
    type: USER_UPDATE_EROLES,
    payload : updateData
})