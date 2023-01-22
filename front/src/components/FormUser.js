import axios from 'axios';
import React , {useEffect, useState} from 'react';
import clienteAxios from '../config/axios';
import Signup from './Signup';
import Swal from 'sweetalert2'
import { useSelector , useDispatch} from 'react-redux';
import {     
    updateUserNameSet,
    updateDniSet,
    updateEmailSet,
    updateLastNameSet,
    updateNameSet,
    updatePhoneSet,
    updateRolesSet, 
} from '../actions/usuarioModificadoActions';

const FormUser = ({roleUserList, modificarUser}) => {

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

    //const[password, passwordSet] = useState('');
    const userName = useSelector(store=>store.usuarioModificado.userName)
    const dni = useSelector(store=>store.usuarioModificado.dni)
    const email = useSelector(store=>store.usuarioModificado.email)
    const phone = useSelector(store=>store.usuarioModificado.phone)
    const name = useSelector(store=>store.usuarioModificado.name)
    const lastName = useSelector(store=>store.usuarioModificado.lastName)
    const roles = useSelector(store=>store.usuarioModificado.roles)


    
    //Cuando el usuario haga submit 
    const submitSignup = async e =>{
        e.preventDefault();
        console.log("on ")

        //Validar formulario
        /*
        if (userName.trim() ==='' || password.trim() ===''){
            return
        }*/
        //ver si no hay errores     


        //Signin
        /*
        signinUser({
            userName,
            password
        })*/
        //var role = roleUserList.filter(val=> val.name === rol)

        var user = {
            userName,
            dni,
            email,
            phone,
            name,
            lastName,
            roles
        }   
        

            
        try {
            console.log(user)
            /*
            const res = await clienteAxios.post('/auth/sign-up',usuarioForm.userUpdate)
            console.log(res)
            Swal.fire(
                'correcto',
                'usuario agregado correctamente',
                'success'
            )         
            */  
        } catch (error) {
            Swal.fire({
                icon : 'error',
                title:'Problemas al agregar usuario',
                text: 'No se pudo agregar el usuario'
            })             
        }


 
    }

/*
    const userNameUpdate =  (e)=>{        
        console.log(e.target.value)
        modificarUsuario(e.target.value)
    }
    const passwordUpdate =(e)=>{
        passwordSet(e.target.value)
        //modificarUsuario(usuarioForm)
    }
    const dniUpdate =(e)=>{
        dniSet(e.target.value)
        //modificarUsuario(usuarioForm)
    }

    const emailUpdate =(e)=>{
        emailSet(e.target.value)
        //modificarUsuario(usuarioForm)
    }

    const phoneUpdate =(e)=>{
        phoneSet(e.target.value)
        //modificarUsuario(usuarioForm)
    }

    const nameUpdate =(e)=>{
        nameSet(e.target.value)
        //modificarUsuario(usuarioForm)
    }

    const lastNameUpdate =(e)=>{
        lastNameSet(e.target.value)
        //modificarUsuario(usuarioForm)
    }
*/

    return ( 
        <div>
            <form
                onSubmit = {submitSignup}
            >
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre de usuario</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name = "userName"
                        value={userName}
                        onChange={e=>modificarUsuarioUserName(e.target.value)}
                    />
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input 
                        type="password" 
                        class="form-control" 
                        id="exampleInputPassword1"
                        name = "password"
                        value={'password'}
                        onChange={e=>modificarUsuarioUserName(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Dni</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name = "dni"
                        value={dni}
                        onChange={e=>modificarUsuarioDni(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input 
                        type="email" 
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name = "email"
                        value={email}
                        onChange={e=>modificarUsuarioEmail(e.target.value)}
                    />
                </div> 
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Teléfono</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name = "phone"
                        value={phone}
                        onChange={e=>modificarUsuarioPhone(e.target.value)}
                    />
                </div> 
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name = "name"
                        value={name}
                        onChange={e=>modificarUsuarioName(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Apellido</label>
                    <input 
                        type="text" 
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp"
                        name = "lastName"
                        onChange={e=>modificarUsuarioLastName(e.target.value)}
                    />
                </div>              
                
                <div>
                    <select  class="form-select form-select-sm" aria-label=".form-select-sm example" onChange={e=>modificarUsuarioRoles(JSON.parse(e.target.value))}>
                        <option defaultValue>Seleccione un rol</option>
                        {roleUserList.map(rol => 
                            <option value= {JSON.stringify(rol)} >{rol.description}</option>
                        )}
                    </select>
                </div>  
                <button type="submit" class="btn btn-primary" >Ingresar</button>
            </form>

        </div>
     );
}
 
export default FormUser;