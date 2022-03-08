import React , { useRef , useState} from 'react';
import { useDispatch , useSelector} from 'react-redux';

//Componentes propios
import VehicleDialog from '../vehicle/Dialog/VehicleDialog'
import UserDialog from '../user/Dialog/UserDialog'
import GarageDialog from '../garage/Dialog/GarageDialog'
import ZoneDialog from '../zone/Dialog/ZoneDialog'

//Readux
import {actionSet,subActionSet,stateResetSet} from '../../actions/stateActions'
import {userSelectedSet,userDeselectedSet} from '../../actions/usuarioSeleccionadoActions'
import {vehicleSelectedSet,vehicleDeselectedSet} from '../../actions/vehiculoSeleccionadoActions'
import {garageSelectedSet,garageDeselectedSet} from '../../actions/garageSeleccionadoActions'
import {zoneSelectedSet,zoneDeselectedSet} from '../../actions/zoneSeleccionadoActions'

//Prime Faces import

import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';

//util
import {AccionesApp} from '../../types/actionList'

//react componentes
import VehiclePrime from '../vehicle/VehicleListPrime'
import GarageListPrime from '../garage/GarageListPrime'
import ZoneListPrime from '../zone/ZoneListPrime'


const AccordionAdmin = ({}) => {

    
    const [miUsuario, setMiUsuario] = useState(JSON.parse(localStorage.getItem("usuarioActual")));

    const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
    const vehiculoSeleccionado = useSelector(store=>store.vehiculoSeleccionado.vehicleSelected)
    const zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)
    const garageSeleccionado = useSelector(store=>store.garageSeleccionado.garageSelected)

    const vehiculoState = useSelector(store=>store.vehiculoSeleccionado.stateVehicleSelection) 
    const usuarioState = useSelector(store=>store.usuarioSeleccionado.stateUserSelection) 
    //Setear en Readux
        //utilizar use Dispacthc y te crea una funcion
        const dispatch = useDispatch();
        
        //manda a llamar el action de usuarioActual
        const accionPrincipal = estado => dispatch(actionSet(estado))
        const accionSecundaria = estado => dispatch(subActionSet(estado))

        //Para habilitar el modal de nuevo usuario
        const cargarUsuarioSeleccionado = usuario => dispatch(userSelectedSet(usuario))
        const resetearUsuarioSeleccionado = usuario => dispatch(userDeselectedSet(usuario))
        const cargarVehiculoSeleccionado = vehiculo => dispatch(vehicleSelectedSet(vehiculo))
        const cargarZonaSeleccionado = zona => dispatch(zoneSelectedSet(zona))
        const resetearVehiculoSeleccionado = vehiculo => dispatch(vehicleDeselectedSet(vehiculo))
        const cargarGarageSeleccionado = garage => dispatch(garageSelectedSet(garage))
        const resetearGarageSeleccionado = garage => dispatch(garageDeselectedSet(garage))


    //Primer React User
    const toast = useRef(null);
 
    
    const buscarVehiculo = () => {
        console.log("Ir a la lista de usuarios")
        accionPrincipal(AccionesApp.accionesCrudVehiculos.accionPrincipal)//Con redux
        accionSecundaria(AccionesApp.accionesCrudVehiculos.busqueda1);
        toast.current.show({severity: 'success', summary: 'Success', detail: 'Ir a Lista de Usuarios'});
    }
    const buscarGarage = () => {
        console.log("Ir a la lista de usuarios")
        accionPrincipal(AccionesApp.accionesCrudGarage.accionPrincipal)//Con redux
        accionSecundaria(AccionesApp.accionesCrudGarage.busqueda1);
        toast.current.show({severity: 'success', summary: 'Success', detail: 'Ir a Lista de Usuarios'});
    }

    const [usuarioNuevo, setUsuarioNuevo] = useState(false);

    const CrearEmpleado= ()=>{
        console.log("Crear empelado")
        cargarUsuarioSeleccionado({nuevo : true}) 
    }

    const CrearVehiculo= ()=>{
        console.log("Crear vehiculo")
        cargarVehiculoSeleccionado({nuevo : true}) 
    }

    const CrearGarage= ()=>{
        console.log("Crear garage")
        cargarGarageSeleccionado({nuevo : true}) 
    }
    const CrearZona= ()=>{
        console.log("Crear zona")
        cargarZonaSeleccionado({nuevo : true}) 
    }

    return ( 
        <div>
            <div class="container">
                <Toast ref={toast} />
            </div>            

            <div class="container">
                <div class="row">
                    <div class="col">
                        <div>    
                            <div class="accordion " id="accordionExample">   
                            <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingVehicle">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMyData" aria-expanded="true" aria-controls="collapseMyData">
                                        Mis datos
                                    </button>
                                    </h2>
                                    <div id="collapseMyData" class="accordion-collapse collapse" aria-labelledby="headingVehicle" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div>
                                                <p>Nombre : {miUsuario.firstName}</p>                                     
                                            </div>
                                            <div>
                                                <p>Apellido : {miUsuario.lastName}</p>                                     
                                            </div>
                                            <div>
                                                <p>Dni : {miUsuario.dni}</p>                                     
                                            </div>
                                            <div>
                                                <p>e-mail : {miUsuario.email}</p>                                     
                                            </div>
                                            <div>
                                                <p>teléfono : {miUsuario.phone}</p>                                     
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingVehicle">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseVehicle" aria-expanded="true" aria-controls="collapseVehicle">
                                        Zonas
                                    </button>
                                    </h2>
                                    <div id="collapseVehicle" class="accordion-collapse collapse" aria-labelledby="headingVehicle" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div>
                                                <ZoneListPrime></ZoneListPrime>                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>      
            </div>
        </div>
     );
}
 
export default AccordionAdmin;