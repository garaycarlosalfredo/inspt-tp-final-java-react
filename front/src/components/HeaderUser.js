import React, { useState , useEffect} from 'react';

//Parar ejecutar las acciones y forma de acceder
import {useDispatch, useSelector} from 'react-redux'


import { useNavigate } from 'react-router';

import { userActualSet ,userSignoutSet , actualUserLocalStorageSet} from '../actions/usuarioActualActions';

const Header = () => {

    const usuarioActual = useSelector(state=>state.usuarioActual.info)

    const dispatch = useDispatch();    
    const navigate = useNavigate();

    const[actualUser, setActualUser] = useState(JSON.parse(localStorage.getItem("usuarioActual")));  
    //const[actualUser, setActualUser] = useState(null);  
    
    const[actualUserRole, actualUserRoleSet] = useState('')
    useEffect(() => {
        setActualUser(JSON.parse(localStorage.getItem("usuarioActual")))
        if(actualUser!==null){
            actualUserRoleSet(actualUser.role)
        }else{
            navigate('/sign-in') 
        }
      },[actualUser]);

    const signoutUser = () => dispatch(userSignoutSet())
    //Cuando el usuario haga submit out
    const submitSignout = e =>{
        e.preventDefault();
        signoutUser();
        setActualUser(null)
        navigate('/sign-in')
    }

    return (

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    {(actualUser!== null || actualUser === undefined)?<li class="nav-item">
                        <a class="nav-link disabled"><i className="pi pi-user"></i> {actualUser.lastName}, {actualUser.firstName} </a>
                    </li>:null}
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                        </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                    </li>

                </ul>
                {(actualUser===null || actualUser === undefined)? 
                <a class="nav-link" href="/sign-in">Ingresar</a> 
                :
                <form onSubmit={submitSignout}>
                    <button type="submit" class="btn btn-primary"><i className=" pi pi-sign-out"></i> Salir</button>
                </form>}
                

                </div>
            </div>
        </nav>

     );
}
 
export default Header;