import React , {useEffect, useState, useRef} from 'react';
 
import { useSelector , useDispatch} from 'react-redux';


//Redux
import {actionSet,subActionSet,stateResetSet} from '../../actions/stateActions'
import {zoneSelectedSet,zoneDeselectedSet} from '../../actions/zoneSeleccionadoActions'
import {userSelectedSet,userDeselectedSet} from '../../actions/usuarioSeleccionadoActions'
import {garageSelectedSet,garageDeselectedSet} from '../../actions/garageSeleccionadoActions'
import {vehicleSelectedSet,vehicleDeselectedSet} from '../../actions/vehiculoSeleccionadoActions'


//Listados
import EmployeeListPrime from '../../components/user/list/EmployeeListPrime';
import ZoneListPrime from '../../components/zone/ZoneListPrime'

//Prime Faces import

import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';

import { Card } from 'primereact/card';

//Estilos PrimeFaces
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

//util
import {AccionesApp} from '../../types/actionList'

//Services
import {asignGaragePartner,unasignGaragePartner,asignVehicleGarage,unasignVehicleGarage} from '../../service/garageService'


const ConfirmVehiculoGarage = () => {
    const time = 1000

    
    //Setear en Readux

        //Conocer el estado
        const vehiculoSeleccionado = useSelector(store=>store.vehiculoSeleccionado.vehicleSelected)
        const garageSeleccionado = useSelector(store=>store.garageSeleccionado.garageSelected)
        const estadoPrincipal = useSelector(store=>store.stateActions.stateAction)
        const estadoSecundario = useSelector(store=>store.stateActions.stateSubAction)

    //Setear en Readux
        //utilizar use Dispacthc y te crea una funcion
        const dispatch = useDispatch();
        
        //manda a llamar el action de usuarioActual
        const accionPrincipal = estado => dispatch(actionSet(estado))
        const accionSecundaria = estado => dispatch(subActionSet(estado))
        const resetearAcciones = estado => dispatch(stateResetSet(estado))
        
        const resetearZonaSeleccionado = usuario => dispatch(zoneDeselectedSet(usuario))
        const resetearUsuarioSeleccionado = usuario => dispatch(userDeselectedSet(usuario))
        const resetearGarageSeleccionado = usuario => dispatch(garageDeselectedSet(usuario))
        const resetearVehicleSeleccionado = usuario => dispatch(vehicleDeselectedSet(usuario))

        
        const toast = useRef(null);


    const alreadyAsigned = ()=>{
        var isPresent = false
        //if (garageSeleccionado.owner != null && garageSeleccionado.owner.dni === vehiculoSeleccionado.dni) isPresent = true
        if (garageSeleccionado.vehicle != null && garageSeleccionado.vehicle.plate === vehiculoSeleccionado.plate) isPresent = true
        
        return isPresent
    }
    
    const finalizar = ()=>{
        if (AccionesApp.accionesVehiculoGarage.confirmarAsignacion === estadoSecundario){
            resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
            resetearGarageSeleccionado()
            resetearVehicleSeleccionado()

        }

    }
    
    const confirmar = async() =>{
        console.log("Confirmar y Terminar")
        //toast.current.show({severity:'success', summary:'Asignado correctamente', detail:`Empleado ${vehiculoSeleccionado.lastName} -> Zona ${garageSeleccionado.id}`});
        //resetearZonaSeleccionado()
        //resetearUsuarioSeleccionado()
        //resetearAcciones(AccionesApp.accionesHome.accionPrincipal)


        let asignacion = {
            id: garageSeleccionado.id,
            lightMeter: garageSeleccionado.lightMeter,
            maintenance: (garageSeleccionado.maintenance)?1:0,
            plate: (vehiculoSeleccionado!=null)?vehiculoSeleccionado.plate:null,
            ownerDni: garageSeleccionado.ownerDni,
            typeId: garageSeleccionado.vehicleType.id,
            zoneId: (garageSeleccionado.zone!=null)?garageSeleccionado.zone.id:null,
            width: garageSeleccionado.width,
            length: garageSeleccionado.length
          }

        let respuestaAsignacion = await asignVehicleGarage(asignacion);



        if(respuestaAsignacion.status !== undefined ){
            console.log('respuestaAsignacion.status !== undefined',respuestaAsignacion.data)
            toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaAsignacion.data}`, life: time*2 });
            return
        }else{        
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Vehiculo asignada correctamente', life: time })
            setTimeout(finalizar,time)
        }
        //setTimeout(finalizar,time)
    }
    const quitar = () =>{
        console.log("Quitar y Terminar")

        let asignacion = {
            id: garageSeleccionado.id,
            
          }

        let respuestaAsignacion = unasignVehicleGarage(asignacion);

        toast.current.show({severity:'warn', summary:'Se quitó correctamente', detail:`Empleado ${vehiculoSeleccionado.lastName} x Zona ${garageSeleccionado.id}`});
        //resetearZonaSeleccionado()
        //resetearUsuarioSeleccionado()
        //resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
        setTimeout(finalizar,1100)
    }
    const cancelar = () =>{
        console.log("Cancelar")
 
        //resetearZonaSeleccionado()
        //resetearUsuarioSeleccionado()
        //resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
        finalizar()
    }


    return (        
        <div>
            
            <div class="container">
                <Toast ref={toast} />
            </div>
            <div className='d-flex justify-content-center m-4'>
                <div className='m-2'>
                    <Card className='text-center' title="Vehiculo" style={{ width: '25rem', marginBottom: '2em' }}>
                        <p><b>Dni : </b> {vehiculoSeleccionado.plate}</p>
                        <p><b>Nombre : </b> {vehiculoSeleccionado.name}, {vehiculoSeleccionado.firstName}</p>      
                        <p><b>Dimensiones auto: </b> ancho {vehiculoSeleccionado.width}, largo {vehiculoSeleccionado.length}</p>   
                        <p><b>Tipo de vehiculo : </b> {vehiculoSeleccionado.vehicleType.description}</p>                   
                    </Card>
                </div>
                <div className='m-2'>  
                    <Card className='text-center' title="Garage" style={{ width: '25rem', marginBottom: '2em' }}>
                        <p><b>Garage id: </b> {garageSeleccionado.id}</p>
                        <p><b>Zona a la que pertenece : </b> {garageSeleccionado.zone.letter}</p>
                        <p><b>Dimensiones garage : </b> ancho {garageSeleccionado.width} , largo {garageSeleccionado.length}</p>
                        <p><b>Tipo de vehiculo : </b> {garageSeleccionado.vehicleType.description}</p>                   
                    </Card>
                </div>  
            </div>
            <div className='d-flex justify-content-center'>
                <Button label="Cancelar" className="p-button-raised p-button-danger m-2" onClick={() => cancelar()}/>
                {(!alreadyAsigned())?
                    <Button label="Confirmar vehiculo en el garage" className="p-button-raised p-button-info m-2" onClick={() => confirmar()}/>
                    :
                    <Button label="Confirmar liberación del Garage" className="p-button-raised p-button-danger m-2" onClick={() => quitar()}/>
                }
            </div>
        </div>
         
     );
}
 
export default ConfirmVehiculoGarage;