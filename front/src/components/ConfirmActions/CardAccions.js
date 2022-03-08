import React from 'react';
import { useSelector} from 'react-redux';
import ModalAsignEmployeeZone from './ModalUserActions';

const CardAccions = ({}) => {

    const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
    const vehiculoSeleccionado = useSelector(store=>store.vehiculoSeleccionado.vehicleSelected)
    const zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)

    //console.log(!(usuarioSeleccionado.zoneEmployee.find(zona => zona.letter == zonaSeleccionado.letter) == undefined))
    const EmpledoZonaCheck = ()=>{
        if(usuarioSeleccionado != null && zonaSeleccionado != null){
            return !(usuarioSeleccionado.zoneEmployee.find(zona => zona.letter == zonaSeleccionado.letter) == undefined)
        }else{
            return false
        }
    }
    let empleadoZonaCheck = EmpledoZonaCheck()

/*
            <div className="d-flex justify-content-center mb-2">              
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={usuarioNuevo}>
                    Crear un nuevo usuario
                </button>
            </div>
            
*/

    return (        
        
        <div class="Container"> 
            <ModalAsignEmployeeZone empleadoZonaCheck = {empleadoZonaCheck}></ModalAsignEmployeeZone>
            <div class="row">                
                <div className="d-flex justify-content-center">

                    {(usuarioSeleccionado != null && zonaSeleccionado != null && usuarioSeleccionado.role.name == 'ROLE_EMPLOYEE')?
                    <div class="d-flex flex-column bd-highlight m-1">
                        {(empleadoZonaCheck)?
                            <a class="btn btn-primary m-1"
                            data-bs-toggle="modal" 
                            data-bs-target="#modalEmployeeZone"
                            >Asignar Zona al empleado</a>
                        :
                            <a class="btn btn-danger m-1">Desasignar Zona al empleado</a>
                        }
                    </div>
                    :
                    null
                    }

                    {(usuarioSeleccionado != null && zonaSeleccionado != null && usuarioSeleccionado.role.name == 'ROLE_PARTNER')?
                    <div class="d-flex flex-column bd-highlight m-1">
                        <a class="btn btn-primary m-1">accion del socio</a>
                        <a class="btn btn-primary m-1">otra accion del socio</a>
                        <a class="btn btn-primary m-1">otra accion del socio</a>
                    </div>
                    :
                    null
                    }
                    {(usuarioSeleccionado != null && zonaSeleccionado != null && usuarioSeleccionado.role.name == 'ROLE_ADMIN')?
                    <div class="d-flex flex-column bd-highlight m-1">
                        <a class="btn btn-primary m-1">Accion de administrador</a>
                        <a class="btn btn-primary m-1">otra accion del administrador</a>
                        <a class="btn btn-primary m-1">otra accion del administrador</a>
                    </div>
                    :
                    null
                    }

                </div>      
                
            </div>
        </div>
     );
}
 
export default CardAccions;