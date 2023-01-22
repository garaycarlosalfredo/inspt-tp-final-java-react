import React from 'react';
import { useSelector , useDispatch} from 'react-redux';
import{
    userDeselectedSet
}from '../../actions/usuarioSeleccionadoActions'

const CardUser = ({usuarioSeleccionado}) => {

    //utilizar use Dispacthc y te crea una funcion
    const dispatch = useDispatch();

    
    const DeseleccionarUsuario = usuarioSeleccionado => dispatch(userDeselectedSet(usuarioSeleccionado))

    const deselectUser = e =>{
        DeseleccionarUsuario()//Con redux
    }


    return (        
        
        <div class="Container">
            <div class="row">
                <div className="d-flex justify-content-center">                    
                    {
                    (usuarioSeleccionado!=null)
                    ?
                    <div class="card min-vw-20 min-vh-20 m-2">
                        <div class="card-body" >
                            <div className='d-flex justify-content-center'>
                                <p>Usuario</p>
                            </div>    
                            <h5 class="card-title d-flex justify-content-center">
                                <p>{usuarioSeleccionado.role.description}</p>
                            </h5>
                            <div class="card-text d-flex justify-content-center">
                                {(usuarioSeleccionado.role.name == "ROLE_EMPLOYEE")?
                                     <p><b>ID: </b>{usuarioSeleccionado.employeeId}</p>
                                    :
                                    <p><b>DNI: </b>{usuarioSeleccionado.dni}</p>
                                }
                            </div>
                            <p> <b>Nombre:</b>{usuarioSeleccionado.lastName}</p>
                            <div className='d-flex justify-content-center'>
                                <a class="btn btn-primary" onClick= {deselectUser}>Cancelar</a>
                            </div>                        
                        </div>
                    </div>
                    :null}
                </div>
            </div>
        </div>
     );
}
 
export default CardUser;