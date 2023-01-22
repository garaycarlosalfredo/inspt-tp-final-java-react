import React, { useEffect, useState } from 'react';
import {getUserAdminList, getUserRolesList, getUserPartnerList,getUserEmployeeList} from '../service/userService'
import FormModalUser from './FormModalUser';
import { useDispatch , useSelector} from 'react-redux';
import { 
    updateUserNameSet,
    updateDniSet,
    updateEmailSet,
    updateLastNameSet,
    updateNameSet,
    updatePhoneSet,
    updateRolesSet,
} from '../actions/usuarioModificadoActions';
import{
    userSelectedSet
}from '../actions/usuarioSeleccionadoActions'


const UsersList = ({}) => {


        const actualUser = JSON.parse(localStorage.getItem("usuarioActual"))
        const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)

        //utilizar use Dispacthc y te crea una funcion
        const dispatch = useDispatch();
        
        //manda a llamar el action de usuarioActual
        const modificarUsuarioDni = usuarioLogin => dispatch(updateDniSet(usuarioLogin))
        const modificarUsuarioEmail = usuarioLogin => dispatch(updateEmailSet(usuarioLogin))
        const modificarUsuarioLastName = usuarioLogin => dispatch(updateLastNameSet(usuarioLogin))
        const modificarUsuarioUserName = usuarioLogin => dispatch(updateUserNameSet(usuarioLogin))
        const modificarUsuarioName = usuarioLogin => dispatch(updateNameSet(usuarioLogin))
        const modificarUsuarioPhone = usuarioLogin => dispatch(updatePhoneSet(usuarioLogin))
        const modificarUsuarioRoles = usuarioLogin => dispatch(updateRolesSet(usuarioLogin))


        //const [seleccionUser, seleccionUserSet] = useState([])//Sin redux
        const seleccionarUsuario = usuarioSeleccionado => dispatch(userSelectedSet(usuarioSeleccionado))

        
    const [adminUserList, adminUserListSet] = useState([])
    const [roleUserList, roleUserListListSet] = useState([])
    const [seleccionRole, seleccionRoleSet] = useState([])
    const [modificarUser, modificarUserSet] = useState(null)


    const submitAdminList = async e =>{
        let userList =[];//= await getUserAdminList()
        //console.log('En userList : ', userList)
        //console.log('Usuario Actual en UserList : ', actualUser)
        const seleccionRole = e.target.value
        seleccionRoleSet(seleccionRole)
        //seleccionRoleSet(e.target.value)
        if(seleccionRole === "ROLE_ADMIN"){userList = await getUserAdminList()}
        if(seleccionRole === "ROLE_PARTNER"){userList = await getUserPartnerList()}
        if(seleccionRole === "ROLE_EMPLOYEE"){userList = await getUserEmployeeList()}
        //console.log(seleccionRole)
        //console.log(userList)
        adminUserListSet(userList)
    }
    
    const getRoleList = async e =>{
        const res = await getUserRolesList()
        //console.log('En roleList : ', res)
        //console.log('Usuario Actual en UserList : ', actualUser)
        roleUserListListSet(res)
    }
/*
    useEffect(() => {
        async function fetchData() {
        // You can await here
        const userList = await getUserAdminList();
        // ...
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state*/

    useEffect(() => {
        async function fetchData() {
        // You can await here
        await getRoleList();
        // ...
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state

    const selectUser = e =>{
        /*modificarUserSet(null)        
        modificarUsuarioDni('')
        modificarUsuarioEmail('')
        modificarUsuarioLastName('')
        modificarUsuarioUserName('')
        modificarUsuarioName('')
        modificarUsuarioPhone('')
        modificarUsuarioRoles('')*/
        seleccionarUsuario(JSON.parse(e.target.value))//Con redux
        //seleccionUserSet(JSON.parse(e.target.value))//Sin redux
    }
    const modifyUser = e =>{
        const userUpdate = JSON.parse(e.target.value)
        modificarUserSet(userUpdate)
        modificarUsuarioUserName(userUpdate.userName)
        modificarUsuarioDni(userUpdate.dni)
        modificarUsuarioEmail(userUpdate.email)
        modificarUsuarioLastName(userUpdate.lastName)
        modificarUsuarioName(userUpdate.name)
        modificarUsuarioPhone(userUpdate.phone)
        modificarUsuarioRoles(userUpdate.roles)
    }
    
    return ( 
        
        
        <div class="container">

            <FormModalUser roleUserList = {roleUserList} modificarUser={modificarUser}/>

  
            <div>
                <select  class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={submitAdminList}>
                    <option defaultValue>Seleccione un rol</option>
                    {roleUserList.map(role => 
                        <option value= {role.name} >{role.description}</option>
                    )}
                </select>
            </div>        

            {(adminUserList.length > 0 )?
            <div class="table-responsive">
            <table class="table ">
                <thead key="id">
                    <tr>
                        <th scope="col">Id</th>
                        {(seleccionRole === 'ROLE_EMPLOYEE')?<th scope="col">Id Empleado</th>:<th scope="col">Dni</th>}
                        
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        {(actualUser.role === 'ROLE_ADMIN')?<th scope="col">Accion</th>:null}
                    </tr>
                </thead>
                <tbody>
                            
                    {adminUserList.map( val =>              
                    <tr>
                        <th scope="row">{val.id}</th>
                        {(seleccionRole === 'ROLE_EMPLOYEE')?<th>
                            {val.employeeId}
                            </th>:<td>{val.dni}</td>}
                        
                        <td>{val.firstName}</td>
                        <td>{val.lastName}</td>

                        {(actualUser.role.name === 'ROLE_ADMIN')?<th>
                            <button type="button" 
                                class="btn btn-success" 
                                value={JSON.stringify(val)} 
                                onClick= {selectUser}
                                >Seleccionar
                            </button>
                            </th>:null}

                        {(actualUser.role.name === 'ROLE_ADMIN')?<th>
                            <button type="button"
                                    class="btn btn-primary" 
                                    value={JSON.stringify(val)} 
                                    onClick= {modifyUser}                                    
                                    data-bs-toggle="modal" 
                                    data-bs-target="#exampleModal"
                                >Modificar
                                </button>
                            </th>:null}
                        {(actualUser.role.name === 'ROLE_ADMIN')?<th>
                            <button type="button" class="btn btn-danger">Eliminar</button>
                            </th>:null}
                    </tr>
                    )}
                </tbody>
            </table>
            </div>
            : null }

        </div>
     );
}
 
export default UsersList;