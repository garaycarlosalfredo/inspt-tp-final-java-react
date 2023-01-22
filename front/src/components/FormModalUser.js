import React from 'react';
import FormUser from './FormUser';
import { useDispatch } from 'react-redux';
import { 
    updateUserNameSet,
    updateDniSet,
    updateEmailSet,
    updateLastNameSet,
    updateNameSet,
    updatePhoneSet,
    updateRolesSet,
} from '../actions/usuarioModificadoActions';

const FormModalUser = ({roleUserList,modificarUser}) => {

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

        const usuarioNuevo = ()=>{
            modificarUsuarioDni('')
            modificarUsuarioEmail('')
            modificarUsuarioLastName('')
            modificarUsuarioUserName('')
            modificarUsuarioName('')
            modificarUsuarioPhone('')
            modificarUsuarioRoles('')
        }

    return ( 
        <div>
            <div className="d-flex justify-content-center mb-2">              
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={usuarioNuevo}>
                    Crear un nuevo usuario
                </button>
            </div>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <FormUser roleUserList= {roleUserList}  modificarUser = {modificarUser}></FormUser>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default FormModalUser;