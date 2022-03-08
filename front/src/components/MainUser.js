import React , {useState, useEffect }from 'react';
import { useNavigate } from 'react-router';
import MainAdmin from './MainAdmin'
import MainPartner from './MainPartner'
import MainEmployee from './MainEmployee'
//Action de Redux
import { userActualSet ,userSignoutSet , actualUserLocalStorageSet} from '../actions/usuarioActualActions';
//Parar ejecutar las acciones y forma de acceder
import {useDispatch, useSelector} from 'react-redux'

const MainUser = () => {
     
        const navigate = useNavigate();        
        //const[actualUser, userNameSet] = useState(JSON.parse(localStorage.getItem("usuarioActual")));  
        
        const[actualUser, userNameSet] = useState(JSON.parse(localStorage.getItem("usuarioActual")));  
        const[actualUserRole, actualUserRoleSet] = useState('')
        useEffect(() => {
            if(actualUser!=null){
                actualUserRoleSet(actualUser.role.name)
            }else{
                navigate('/sign-in') 
            }
          },[actualUser]);
          console.log('actualUser',actualUser)

    return ( 
        <div>           

        <div className="d-flex justify-content-center">
                <h4> Bienvenido {(actualUser != null)?actualUser.firstName : null}</h4>
        </div>

        {(actualUserRole === "ROLE_ADMIN") ? 
        <MainAdmin actualUser = {actualUser}></MainAdmin>: null }   
          
        {(actualUserRole === "ROLE_PARTNER") ? 
        <MainPartner actualUser = {actualUser}></MainPartner>: null }   

        {(actualUserRole === "ROLE_EMPLOYEE") ? <MainEmployee></MainEmployee> : null }  
        </div>
     );
}
 
export default MainUser;