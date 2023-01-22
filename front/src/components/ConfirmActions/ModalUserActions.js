import React from 'react';
import { useSelector} from 'react-redux';
import ZoneList from '../zone/ZoneList';
import CardUser from './CardUser';
import AcordionActions from './AcordionActions'


const ModalUserActions = ({empleadoZonaCheck, garageZonaCheck}) => {



    const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
    const zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)
    const vehiculoSeleccionado = useSelector(store=>store.vehiculoSeleccionado.vehicleSelected)




    return (
        <div class="modal" id='modalUserActions' tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>

                    {(empleadoZonaCheck)?                                                       
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" data-bs-target="#modalUserActions">Confirmar Asignación</button>
                        :
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" data-bs-target="#modalUserActions">Confirmar Desasignación</button>
                        }
                </div>
                </div>
            </div>
        </div> 
    )
    }
export default ModalUserActions;