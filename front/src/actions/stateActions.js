import {
    ACTION_SET,
    SUBACTION_SET,
    RESET_ALL
} from '../types/actionStatusTypes'

//Accion Principal
export function actionSet(data){    
    return (dispatch)=>{
        dispatch(action(data))
    }
}
const action = (data)=>({
    type: ACTION_SET,
    payload : data
})

//Accion secundario
export function subActionSet(data){    
    return (dispatch)=>{
        dispatch(subAction(data))
    }
}
const subAction = (data)=>({
    type: SUBACTION_SET,
    payload : data
})


//Buschar Empleado
export function stateResetSet(data){    
    return (dispatch)=>{
        dispatch(stateReset(data))
    }
}
const stateReset = (data)=>({
    type: RESET_ALL,
    payload : data
})