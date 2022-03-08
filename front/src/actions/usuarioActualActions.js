import clienteAxios from '../config/axios'
import createHeader from '../config/axiosConfigurations'
import Swal from 'sweetalert2'

import {
    SIGNIN,
    SIGNOUT,
    SIGNIN_SUCCESS,
    USER_ADMIN,
    UPDATE_USER,
    SIGNIN_ERROR
} from '../types'

//LOGIN
export function userLoginSet(usuarioLogin){
    return async (dispatch)=>{
        dispatch( login() )

            try {
                const  {data}  = await clienteAxios.post('http://localhost:8080/auth/sign-in',usuarioLogin)
                localStorage.setItem("token",data.jwt)

                const  login  = await clienteAxios.get('http://localhost:8080/auth/me', createHeader())      
                await console.log("respuesta del jwt ",login.data)


                let actualUser = login.data
                //actualUser.jwt = data.headers.jwt[0]
                console.log("respuesta login ",login.data)
                dispatch(userActualSet(actualUser))
                localStorage.setItem("usuarioActual",JSON.stringify(actualUser))


                
                Swal.fire(
                    'correcto',
                    'bienvenido ',
                    'success'
                )
                
                //(data)?:;
            } catch (error) {
                console.log("Error en ACC = ",error)
                console.log(error.response.data)   
                localStorage.clear()       
                dispatch(loginError(true))     
                dispatch( logout() )      
                Swal.fire({
                    icon : 'error',
                    title:'Hubo un problema con tu inicio',
                    text: 'El usuario o la congraseña incorrectos'
                }) 
            }
    }
}

export function actualUserSet(data){    
    return (dispatch)=>{
        dispatch(userActualSet(data))
    }
}
export function actualUserLocalStorageSet(data){    
    return (dispatch)=>{
        dispatch(userActualSet(data))
    }
}

export function userSignoutSet(){
    return(dispatch)=>{
        dispatch( logout() )
        //localStorage.setItem("usuarioActual",null)
        localStorage.clear()
    }
}

export function updateUserAction(){
    return(dispatch)=>{
        dispatch( updateUser() )
    }
}

const login = ()=>({
    type: SIGNIN,
    payload: true
})

const logout = ()=>({
    type: SIGNOUT,
    payload: null
})

const userActualSet = (usuarioActual)=>({
    type: SIGNIN_SUCCESS,
    payload: usuarioActual
})

const userAdmin = ()=>({
    type: USER_ADMIN,
    payload: true
})

const loginError = (estado)=>({
    type: SIGNIN_ERROR,
    payload: estado
})

const updateUser = (userUpdate)=>({
    type: UPDATE_USER,
    payload : userUpdate
})