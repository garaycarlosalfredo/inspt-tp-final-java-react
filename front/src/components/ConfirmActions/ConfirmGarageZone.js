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
import {asignGaragePartner,unasignGaragePartner,asignVehicleGarage,unasignVehicleGarage, asignZoneGarage, unAsignZoneGarage} from '../../service/garageService'


const ConfirmGarageZone = () => {
    const time = 1000

    
    //Setear en Readux

        //Conocer el estado
        const zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)
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
        if (garageSeleccionado.zone != null && garageSeleccionado.zone.id === zonaSeleccionado.id) isPresent = true
        return isPresent
    }
    
    const finalizar = ()=>{
        if (AccionesApp.accionesGarageZona.confirmarAsignacion === estadoSecundario){
            resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
            resetearGarageSeleccionado()
            resetearZonaSeleccionado()

        }

    }
    
    const confirmar = async() =>{
        console.log("Confirmar y Terminar")
        //toast.current.show({severity:'success', summary:'Asignado correctamente', detail:`Empleado ${zonaSeleccionado.lastName} -> Zona ${garageSeleccionado.id}`});
        //resetearZonaSeleccionado()
        //resetearUsuarioSeleccionado()
        //resetearAcciones(AccionesApp.accionesHome.accionPrincipal)


        let asignacion = {
            id: garageSeleccionado.id,
            lightMeter: garageSeleccionado.lightMeter,
            maintenance: (garageSeleccionado.maintenance)?1:0,
            plate: (garageSeleccionado.vehicle!== null)?garageSeleccionado.vehicle.plate:null,
            ownerDni: (garageSeleccionado.owner!== null)?garageSeleccionado.owner.dni:null,
            typeId: garageSeleccionado.vehicleType.id,
            zoneId: zonaSeleccionado.id,
            width: garageSeleccionado.width,
            length: garageSeleccionado.length
          }

        let respuestaAsignacion = await asignZoneGarage(asignacion);


        if(respuestaAsignacion.status !== undefined ){
            console.log('respuestaAsignacion.status !== undefined',respuestaAsignacion.data)
            toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaAsignacion.data}`, life: time*2 });
            return
        }else{        
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Zona asignada Modificado', life: time })
            setTimeout(finalizar,time)
        }
    }
    const quitar = () =>{
        console.log("Quitar y Terminar")

        let asignacion = {
            id: garageSeleccionado.id,
            
          }

        let respuestaAsignacion = unAsignZoneGarage(asignacion);

        if(respuestaAsignacion.status !== undefined ){
            console.log('respuestaAsignacion.status !== undefined',respuestaAsignacion.data)
            toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaAsignacion.data}`, life: time*2 });
            return
        }else{        
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Zona asignada Modificado', life: time })
            setTimeout(finalizar,time)
        }
        //toast.current.show({severity:'warn', summary:'Se quitó correctamente', detail:`Empleado ${zonaSeleccionado.lastName} x Zona ${garageSeleccionado.id}`});
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
                    <Card className='text-center' title="Garage" style={{ width: '25rem', marginBottom: '2em' }}>
                        <p><b>Garage id: </b> {garageSeleccionado.id}</p>
                        <p><b>Zona a la que pertenece : </b> {(garageSeleccionado.zone!==null)?garageSeleccionado.zone.letter:'No tiene asignación'}</p>
                        <p><b>Dimensiones garage : </b> ancho {garageSeleccionado.width} , largo {garageSeleccionado.length}</p>
                    </Card>
                </div>  
                
                <div className='m-2'>
                    <Card className='text-center' title="Zona" style={{ width: '25rem', marginBottom: '2em' }}>
                        <p><b>Letra : </b> {zonaSeleccionado.letter}</p>
                        <p><b>cantidad de vehiculos : </b> {zonaSeleccionado.vehicleQuantity}</p>      
                        <p><b>Tipo de vehiculos: </b> {zonaSeleccionado.vehicleType.description}</p>                      
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
 
export default ConfirmGarageZone;