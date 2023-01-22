import React from 'react';
import { useSelector , useDispatch} from 'react-redux';
import{
    vehicleDeselectedSet
}from '../../actions/vehiculoSeleccionadoActions'

const CardVehicle = ({vehiculoSeleccionado}) => {

    //utilizar use Dispacthc y te crea una funcion
    const dispatch = useDispatch();

    
    const DeseleccionarVehiculo = vehiculoSeleccionado => dispatch(vehicleDeselectedSet(vehiculoSeleccionado))

    const deselectUser = e =>{
        DeseleccionarVehiculo()//Con redux
    }


    return (        
        
        <div class="Container">
            <div class="row">
                <div className="d-flex justify-content-center">                    
                    {
                    (vehiculoSeleccionado!=null)
                    ?
                        <div class="card min-vw-20 min-vh-20 m-2">
                            <div class="card-body" >
                                <div className='d-flex justify-content-center'>
                                    <p>Vehiculo</p>
                                </div>   
                                <h5 class="card-title d-flex justify-content-center">
                                    <p>{vehiculoSeleccionado.vehicleType.description}</p>
                                </h5>
                                <div class="card-text d-flex justify-content-center">
                                     <p><b>Matricula: </b>{vehiculoSeleccionado.plate}</p>
                                </div>
                                <p> <b>Vehiculo:</b>{vehiculoSeleccionado.name}</p>
                                <div className='d-flex justify-content-center'>
                                    <a class="btn btn-primary" onClick= {deselectUser}>Cancelar</a>
                                </div>                            
                            </div>
                        </div>
                    :
                        null
                    }
                </div>
            </div>
        </div>
     );
}
 
export default CardVehicle;