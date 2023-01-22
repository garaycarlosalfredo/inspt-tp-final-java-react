import React , {useEffect, useState, useRef} from 'react';
 
import { useSelector , useDispatch} from 'react-redux';


//Redux
import {actionSet,subActionSet,stateResetSet} from '../../actions/stateActions'
import {zoneSelectedSet,zoneDeselectedSet} from '../../actions/zoneSeleccionadoActions'
import {userSelectedSet,userDeselectedSet} from '../../actions/usuarioSeleccionadoActions'
import {garageSelectedSet,garageDeselectedSet} from '../../actions/garageSeleccionadoActions'


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

const ConfirmPartnerGarage = () => {
    const time = 2000

    
    //Setear en Readux

        //Conocer el estado
        const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
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

        
        const toast = useRef(null);


    const alreadyAsigned = ()=>{
        var isPresent = false
        //usuarioSeleccionado.zoneEmployee.forEach(element => {
        //   if (element.letter === zonaSeleccionado.letter){ isPresent = true}
        //});
        if (garageSeleccionado.owner != null && garageSeleccionado.owner.dni === usuarioSeleccionado.dni) isPresent = true
        return isPresent
    }
    
    const finalizar = ()=>{
        if (AccionesApp.accionesSocioGarage.confirmarAsignacion == estadoSecundario){
            resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
            resetearZonaSeleccionado()
            resetearUsuarioSeleccionado()

        }

    }
    
    const confirmar = async() =>{
        console.log("Confirmar y Terminar")

        
        //toast.current.show({severity:'success', summary:'Asignado correctamente', detail:`Empleado ${usuarioSeleccionado.lastName} -> Zona ${garageSeleccionado.id}`});
        //resetearZonaSeleccionado()
        //resetearUsuarioSeleccionado()
        //resetearAcciones(AccionesApp.accionesHome.accionPrincipal)


        let asignacion = {
            id: garageSeleccionado.id,
            lightMeter: garageSeleccionado.lightMeter,
            maintenance: (garageSeleccionado.maintenance)?1:0,
            plate: (garageSeleccionado.vehicle!=null)?garageSeleccionado.vehicle.plate:null,
            ownerDni: usuarioSeleccionado.dni,
            typeId: garageSeleccionado.vehicleType.id,
            zoneId: (garageSeleccionado.zone!=null)?garageSeleccionado.zone.id:null,
            width: garageSeleccionado.width,
            length: garageSeleccionado.length
          }

        let respuestaAsignacion = await asignGaragePartner(asignacion);

        console.log('respuestaAsignacion',respuestaAsignacion)

        if(respuestaAsignacion.status !== undefined || respuestaAsignacion.status !== undefined){
            console.log('respuestaAsignacion.status !== undefined',respuestaAsignacion.data)
            toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaAsignacion.data}`, life: time });
            return
        }
        
        toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Zona asignada Modificado', life: time })
        
        setTimeout(finalizar,1100)
    }
    const quitar = () =>{
        console.log("Quitar y Terminar")

        let asignacion = {
            id: garageSeleccionado.id,
            
          }

        let respuestaAsignacion = unasignGaragePartner(asignacion);

        toast.current.show({severity:'warn', summary:'Se quitó correctamente', detail:`Empleado ${usuarioSeleccionado.lastName} x Zona ${garageSeleccionado.id}`});
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
                    <Card className='text-center' title="Garage" style={{ width: '25rem', marginBottom: '2em' }}>
                        <p><b>Garage id: </b> {garageSeleccionado.id}</p>
                        <p><b>Zona a la que pertenece : </b> {garageSeleccionado.zone.letter}</p>
                        <p><b>Cantidad de vehiculos : </b> dato </p>
                    </Card>
                </div>  
            </div>
            <div className='d-flex justify-content-center'>
                <Button label="Cancelar" className="p-button-raised p-button-danger m-2" onClick={() => cancelar()}/>
                {(!alreadyAsigned())?
                    <Button label="Confirmar compra garage" className="p-button-raised p-button-info m-2" onClick={() => confirmar()}/>
                    :
                    <Button label="Confirmar liberación Garage" className="p-button-raised p-button-danger m-2" onClick={() => quitar()}/>
                }
            </div>
        </div>
         
     );
}
 
export default ConfirmPartnerGarage;