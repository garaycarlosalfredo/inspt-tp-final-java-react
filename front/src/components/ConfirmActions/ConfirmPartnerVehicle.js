import React , {useEffect, useState, useRef} from 'react';
 
import { useSelector , useDispatch} from 'react-redux';


//Redux
import {actionSet,subActionSet,stateResetSet} from '../../actions/stateActions'
import {zoneSelectedSet,zoneDeselectedSet} from '../../actions/zoneSeleccionadoActions'
import {userSelectedSet,userDeselectedSet} from '../../actions/usuarioSeleccionadoActions'
import {garageSelectedSet,garageDeselectedSet} from '../../actions/garageSeleccionadoActions'
import {vehicleSelectedSet, vehicleDeselectedSet} from '../../actions/vehiculoSeleccionadoActions'


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
import {asignGaragePartner,unasignGaragePartner} from '../../service/garageService'
import { asignVehiclePartner, unasignVehiclePartner } from '../../service/vehicleService'

const ConfirmPartnerVehicle = () => {

    
    //Setear en Readux

        //Conocer el estado
        const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
        const garageSeleccionado = useSelector(store=>store.garageSeleccionado.garageSelected)
        const vehicleSeleccionado = useSelector(store=>store.vehiculoSeleccionado.vehicleSelected)
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
        const resetearVehiculoSeleccionado = usuario => dispatch(vehicleDeselectedSet(usuario))

        
        const toast = useRef(null);


    const alreadyAsigned = ()=>{
        var isPresent = false
        //usuarioSeleccionado.zoneEmployee.forEach(element => {
        //   if (element.letter === zonaSeleccionado.letter){ isPresent = true}
        //});
        if (vehicleSeleccionado.owner != null && vehicleSeleccionado.owner.dni === usuarioSeleccionado.dni) isPresent = true
        return isPresent
    }
    
    const finalizar = ()=>{
        if (AccionesApp.accionesSocioVehiculo.confirmarAsignacion == estadoSecundario){
            resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
            resetearZonaSeleccionado()
            resetearUsuarioSeleccionado()
        }
    }
    
    const confirmar = () =>{
        console.log("Confirmar y Terminar")
        toast.current.show({severity:'success', summary:'Se quitó correctamente', detail:`Socio ${usuarioSeleccionado.lastName} -> vehiculo ${vehicleSeleccionado.plate}`});
        //resetearZonaSeleccionado()
        //resetearUsuarioSeleccionado()
        //resetearAcciones(AccionesApp.accionesHome.accionPrincipal)


        let asignacion = {
            id: vehicleSeleccionado.id,
            plate: vehicleSeleccionado.plate,
            name: vehicleSeleccionado.name,
            typeId: vehicleSeleccionado.vehicleType.id,
            width: vehicleSeleccionado.width,
            length: vehicleSeleccionado.length,
            ownerDni: usuarioSeleccionado.dni
          }

        let respuestaAsignacion = asignVehiclePartner(asignacion);
        setTimeout(finalizar,1100)
    }
    const quitar = () =>{
        console.log("Quitar y Terminar")

        let asignacion = {
            id: vehicleSeleccionado.id,
            plate: vehicleSeleccionado.plate,
            name: vehicleSeleccionado.name,
            typeId: vehicleSeleccionado.vehicleType.id,
            width: vehicleSeleccionado.width,
            length: vehicleSeleccionado.length,
            ownerDni: null
          }

        let respuestaAsignacion = unasignVehiclePartner(asignacion);

        toast.current.show({severity:'warn', summary:'Se quitó correctamente', detail:`Socio ${usuarioSeleccionado.lastName} -> vehiculo ${vehicleSeleccionado.plate}`});
        //resetearZonaSeleccionado()
        //resetearUsuarioSeleccionado()
        //resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
        //setTimeout(finalizar,1100)
    }
    const cancelar = () =>{
        console.log("Cancelar")
 
        resetearVehiculoSeleccionado()
        resetearUsuarioSeleccionado()
        resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
        finalizar()
    }


    return (        
        <div>
            
            <div class="container">
                <Toast ref={toast} />
            </div>
            <div className='d-flex justify-content-center m-4'>
                <div className='m-2'>
                    <Card className='text-center' title="Socio" style={{ width: '25rem', marginBottom: '2em' }}>
                        <p><b>Dni : </b> {usuarioSeleccionado.dni}</p>
                        <p><b>Nombre : </b> {usuarioSeleccionado.lastName}, {usuarioSeleccionado.firstName}</p>
                        <p><b>Zonas : </b>
                        {(false)?usuarioSeleccionado.zoneEmployee.map(
                            zona => 
                            `[${zona.letter}] `
                        ):null}
                        </p>
                    </Card>
                </div>
                <div className='m-2'>  
                    <Card className='text-center' title="Vehiculo" style={{ width: '25rem', marginBottom: '2em' }}>
                        <p><b>Id: </b> {vehicleSeleccionado.id}</p>
                        <p><b>Patente : </b> {vehicleSeleccionado.plate}</p>
                        <p><b>Tipo de vehiculo : </b> {vehicleSeleccionado.vehicleType.description} </p>
                    </Card>
                </div>  
            </div>
            <div className='d-flex justify-content-center'>
                <Button label="Cancelar" className="p-button-raised p-button-danger m-2" onClick={() => cancelar()}/>
                {(!alreadyAsigned())?
                    <Button label="Confirmar asignación" className="p-button-raised p-button-info m-2" onClick={() => confirmar()}/>
                    :
                    <Button label="Confirmar liberación" className="p-button-raised p-button-danger m-2" onClick={() => quitar()}/>
                }
            </div>
        </div>
         
     );
}
 
export default ConfirmPartnerVehicle;