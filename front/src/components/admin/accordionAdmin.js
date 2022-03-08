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


const AccordionAdmin = ({actualUser}) => {

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
    const accionesUsuario = [
        {
            label: 'Buscar empleado para asignar una zona',
            icon: 'pi pi-paperclip',            
            command: () => {
                console.log("ir a asignar zona a empleado")
                accionPrincipal(AccionesApp.accionesEmpleadoZona.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesEmpleadoZona.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Zona a Empleado'});
            }
        },
        {
            label: 'Buscar socio para asignar una cochera',
            icon: 'pi pi-paperclip',
            command: () => {
                accionPrincipal(AccionesApp.accionesSocioGarage.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesSocioGarage.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Cochera a Socio'});
            }
        },
        {
            label: 'Buscar socio para asignar un vehiculo',
            icon: 'pi pi-paperclip',
            command: () => {
                accionPrincipal(AccionesApp.accionesSocioVehiculo.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesSocioVehiculo.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Vehiculo a Socio'});
            }
        }
    ];

    const accionesVehiculo = [
        /*{
            label: 'Buscar empleado para asignar una zona',
            icon: 'pi pi-paperclip',            
            command: () => {
                console.log("ir a asignar zona a empleado")
                accionPrincipal(AccionesApp.accionesEmpleadoZona.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesEmpleadoZona.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Zona a Empleado'});
            }
        },*/
        {
            label: 'Buscar vehiculo para asignar una cochera',
            icon: 'pi pi-paperclip',
            command: () => {
                accionPrincipal(AccionesApp.accionesVehiculoGarage.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesVehiculoGarage.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Cochera a Socio'});
            }
        },
        {
            label: 'Buscar socio para asignar un vehiculo',
            icon: 'pi pi-paperclip',
            command: () => {
                accionPrincipal(AccionesApp.accionesSocioVehiculo.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesSocioVehiculo.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Vehiculo a Socio'});
            }
        }
    ];

    const accionesGarage = [
        {
            label: 'Buscar garage para asignar una zona',
            icon: 'pi pi-paperclip',            
            command: () => {
                console.log("ir a asignar zona a empleado")
                accionPrincipal(AccionesApp.accionesGarageZona.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesGarageZona.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Zona a Empleado'});
            }
        },
        {
            label: 'Buscar vehiculo para asignar una cochera',
            icon: 'pi pi-paperclip',
            command: () => {
                accionPrincipal(AccionesApp.accionesVehiculoGarage.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesVehiculoGarage.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Cochera a Socio'});
            }
        },
        {
            label: 'Buscar socio para asignar un garage',
            icon: 'pi pi-paperclip',
            command: () => {
                accionPrincipal(AccionesApp.accionesSocioGarage.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesSocioGarage.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Vehiculo a Socio'});
            }
        }
    ];

    const accionesZona = [
        {
            label: 'Buscar garage para asignar una zona',
            icon: 'pi pi-paperclip',            
            command: () => {
                console.log("ir a asignar zona a empleado")
                accionPrincipal(AccionesApp.accionesGarageZona.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesGarageZona.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Zona a Empleado'});
            }
        },{
            label: 'Buscar empleado para asignar una zona',
            icon: 'pi pi-paperclip',            
            command: () => {
                console.log("ir a asignar zona a empleado")
                accionPrincipal(AccionesApp.accionesEmpleadoZona.accionPrincipal)//Con redux
                accionSecundaria(AccionesApp.accionesEmpleadoZona.busqueda1);
                //toast.current.show({severity:'success', summary:'Updated', detail:'Asignar Zona a Empleado'});
            }
        },
    ];
    const buscarUsuarios = () => {
        console.log("Ir a la lista de usuarios")
        accionPrincipal(AccionesApp.accionesCrudUsuarios.accionPrincipal)//Con redux
        accionSecundaria(AccionesApp.accionesCrudUsuarios.busqueda1);
        toast.current.show({severity: 'success', summary: 'Success', detail: 'Ir a Lista de Usuarios'});
    }
    
    const buscarVehiculo = () => {
        console.log("Ir a la lista de usuarios")
        accionPrincipal(AccionesApp.accionesCrudVehiculos.accionPrincipal)//Con redux
        accionSecundaria(AccionesApp.accionesCrudVehiculos.busqueda1);
        toast.current.show({severity: 'success', summary: 'Success', detail: 'Ir a Lista de Usuarios'});
    }
    const buscarZona = () => {
        console.log("Ir a la lista de zonas")
        accionPrincipal(AccionesApp.accionesCrudZona.accionPrincipal)//Con redux
        accionSecundaria(AccionesApp.accionesCrudZona.busqueda1);
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

            {(usuarioSeleccionado != null && usuarioSeleccionado.nuevo != null)?<UserDialog></UserDialog>:null}
            {(vehiculoSeleccionado != null && vehiculoSeleccionado.nuevo != null)?<VehicleDialog></VehicleDialog>:null}
            {(garageSeleccionado != null && garageSeleccionado.nuevo != null)?<GarageDialog></GarageDialog>:null}
            {(zonaSeleccionado != null && zonaSeleccionado.nuevo != null)?<ZoneDialog></ZoneDialog>:null}
            
            

            <div class="container">
                <div class="row">
                    <div class="col">
                        <div>    
                            <div class="accordion " id="accordionExample">   

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Usuario
                                    </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div>
                                                <div>
                                                    <Button label="Crear Usuario Nuevo" className="p-button-raised p-button-info m-2" onClick={() => CrearEmpleado()}/>
                                                    <SplitButton 
                                                    label="Buscar Usuario" 
                                                    icon="pi pi-search" 
                                                    model={accionesUsuario} 
                                                    onClick={() => buscarUsuarios()}
                                                    className="p-button-info p-mr-2 m-2"></SplitButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingVehicle">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseVehicle" aria-expanded="true" aria-controls="collapseVehicle">
                                        Vehiculo
                                    </button>
                                    </h2>
                                    <div id="collapseVehicle" class="accordion-collapse collapse" aria-labelledby="headingVehicle" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div>
                                                <div>
                                                    <Button label="Crear Vehiculo Nuevo" className="p-button-raised p-button-info m-2" onClick={() => CrearVehiculo()}/>
                                                    <SplitButton 
                                                    label="Buscar Vehiculo" 
                                                    icon="pi pi-search" 
                                                    model={accionesVehiculo} 
                                                    onClick={() => buscarVehiculo()}
                                                    className="p-button-info p-mr-2 m-2"></SplitButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingGarage">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseGarage" aria-expanded="true" aria-controls="collapseGarage">
                                        Garage
                                    </button>
                                    </h2>
                                    <div id="collapseGarage" class="accordion-collapse collapse" aria-labelledby="headingGarage" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div>
                                                <div>
                                                    <Button label="Crear Garage Nuevo" className="p-button-raised p-button-info m-2" onClick={() => CrearGarage()}/>
                                                    <SplitButton 
                                                    label="Buscar Garage" 
                                                    icon="pi pi-search" 
                                                    model={accionesGarage} 
                                                    onClick={() => buscarGarage()}
                                                    className="p-button-info p-mr-2 m-2"></SplitButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingZona">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseZona" aria-expanded="true" aria-controls="collapseZona">
                                        Zona
                                    </button>
                                    </h2>
                                    <div id="collapseZona" class="accordion-collapse collapse" aria-labelledby="headingZona" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <div>
                                                <div>
                                                    <Button label="Crear Zona Nuevo" className="p-button-raised p-button-info m-2" onClick={() => CrearZona()}/>
                                                    <SplitButton 
                                                    label="Buscar Zona" 
                                                    icon="pi pi-search" 
                                                    model={accionesZona} 
                                                    onClick={() => buscarZona()}
                                                    className="p-button-info p-mr-2 m-2"></SplitButton>
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
        </div>
     );
}
 
export default AccordionAdmin;