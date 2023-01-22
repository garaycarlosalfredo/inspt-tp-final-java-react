import React, { useState , useEffect} from 'react';

//Parar ejecutar las acciones y forma de acceder
import {useDispatch, useSelector} from 'react-redux'


import { useNavigate } from 'react-router';

import { userActualSet,actualUserSet ,userSignoutSet , actualUserLocalStorageSet} from '../actions/usuarioActualActions';

//Redux
import {actionSet,subActionSet,stateResetSet} from '../actions/stateActions'

//util
import {AccionesApp} from '../types/actionList'


const Header = () => {

    const usuarioActual = useSelector(state=>state.usuarioActual.info)
    console.log('usuarioActual',usuarioActual)

    const dispatch = useDispatch();    
    const navigate = useNavigate();

    //Redux 
    const resetearAcciones = estado => dispatch(stateResetSet(estado))

    const localStorageUser = JSON.parse(localStorage.getItem("usuarioActual"))
    let userNow = localStorageUser
    console.log('localStorageUser',localStorageUser)
    console.log('usuarioActual',usuarioActual)
    
    if(usuarioActual===null){userNow = localStorageUser}
    const[actualUser, setActualUser] = useState(userNow); 
    console.log('actualUser',actualUser) 
    //const[actualUser, setActualUser] = useState(null);  
    
    const[actualUserRole, actualUserRoleSet] = useState('')

    useEffect(() => {
        //setActualUser(JSON.parse(localStorage.getItem("usuarioActual")))
        
        resetearAcciones(AccionesApp.accionesHome.accionPrincipal)

        console.log('actualUser useEfect',actualUser)
        console.log('usuarioActual useEfect',usuarioActual)

        if(usuarioActual===null){
            
            actualUserSet(actualUser)
            setActualUser(actualUser)
            console.log('Local storage',JSON.parse(localStorage.getItem("usuarioActual")))
            console.log('actualUser JSON',actualUser)
        }
        console.log('usuarioActual useEfect',usuarioActual)
        
        if(actualUser===null || actualUser=== undefined){
            navigate('/sign-in') 
        }
      },[actualUser]);

    const signoutUser = () => dispatch(userSignoutSet())
    //Cuando el usuario haga submit out
    const submitSignout = e =>{
        e.preventDefault();
        signoutUser();
        setActualUser(null)
        resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
        navigate('/sign-in')
    }

    return (

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/main"><i className="pi pi-home"></i></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Gestión de Garage</a>
                    </li>
                    {(usuarioActual!== null || usuarioActual === undefined)?<li class="nav-item">
                        <a class="nav-link disabled"><i className="pi pi-user"></i> {usuarioActual.lastName}, {usuarioActual.firstName} </a>
                    </li>:null}
                   

                </ul>
                {(actualUser===null && usuarioActual === null)? 
                <a class="nav-link" href="/sign-in">Ingresar</a> 
                :
                <form onSubmit={submitSignout}>
                    <button type="submit" class="btn btn-primary"><i className="pi pi-sign-out"></i> Salir</button>
                </form>}
                

                </div>
            </div>
        </nav>

     );
}
 
export default Header;