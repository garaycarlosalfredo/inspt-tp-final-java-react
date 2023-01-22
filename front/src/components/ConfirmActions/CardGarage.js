import React from 'react';
import { useSelector , useDispatch} from 'react-redux';
import{
    garageDeselectedSet
}from '../../actions/garageSeleccionadoActions'

const CardGarage = ({garageSeleccionado}) => {

    
    //utilizar use Dispacthc y te crea una funcion
    const dispatch = useDispatch();

    
    const DeseleccionarGarage = garageSeleccionado => dispatch(garageDeselectedSet(garageSeleccionado))

    const deselectGarage = e =>{
        DeseleccionarGarage()//Con redux
    }


    return (        
        
        <div class="Container">
            <div class="row">
                <div className="d-flex justify-content-center">                    
                    {
                    (garageSeleccionado!=null)
                    ?
                        <div class="card min-vw-20 min-vh-20 m-2">
                            <div class="card-body" >                                
                                <div className='d-flex justify-content-center'>
                                    <p>Garage</p>
                                </div>  
                                <h5 class="card-title d-flex justify-content-center">
                                    <p><b>ID :</b>{garageSeleccionado.id}</p>
                                </h5>
                                <div class="card-text d-flex justify-content-center">
                                    <p> <b>Vehiculo:</b> </p>{(garageSeleccionado.vehicle != null )?<p> {garageSeleccionado.vehicle.plate}</p>: <p>No asignada</p>}
                                </div>
                                <p> <b>En Zona : </b>{(garageSeleccionado.zone!= null)?garageSeleccionado.zone.letter:<p>No Asignado</p>}</p>
                                <div className='d-flex justify-content-center'>
                                    <a class="btn btn-primary" onClick= {deselectGarage}>Cancelar</a>
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
 
export default CardGarage;