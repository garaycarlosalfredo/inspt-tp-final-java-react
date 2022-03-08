import React , {useEffect, useState, useRef} from 'react';
 
import { useSelector , useDispatch} from 'react-redux';


//Redux
import {actionSet,subActionSet,stateResetSet} from '../../actions/stateActions'
import {zoneSelectedSet,zoneDeselectedSet} from '../../actions/zoneSeleccionadoActions'
import {userSelectedSet,userDeselectedSet} from '../../actions/usuarioSeleccionadoActions'


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
import {asignZoneToEmployee,deleteZoneToEmployee} from '../../service/zoneService'

const ConfirmZoneEmployee = () => {

    const time = 1000
    
    //Setear en Readux

        //Conocer el estado
        const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
        const zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)
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

        
        const toast = useRef(null);


    const alreadyAsigned = ()=>{
        var isPresent = false
        usuarioSeleccionado.zoneEmployee.forEach(element => {
           if (element.letter === zonaSeleccionado.letter){ isPresent = true}
        });
        return isPresent
    }
    
    const finalizar = ()=>{
        if (AccionesApp.accionesEmpleadoZona.confirmarAsignacion == estadoSecundario){
            resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
            resetearZonaSeleccionado()
            resetearUsuarioSeleccionado()

        }

    }
    
    const confirmar = async() =>{
        console.log("Confirmar y Terminar")
        //toast.current.show({severity:'success', summary:'Asignado correctamente', detail:`Empleado ${usuarioSeleccionado.lastName} -> Zona ${zonaSeleccionado.letter}`});
        //resetearZonaSeleccionado()
        //resetearUsuarioSeleccionado()
        //resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
        let asignacion = {
            employeeId: usuarioSeleccionado.id,
            zoneId: zonaSeleccionado.id,
            carsAsignedNumber: 1,
        }
        let respuestaAsignacion = await asignZoneToEmployee(asignacion);

        if(respuestaAsignacion.status !== undefined ){
            console.log('respuestaAsignacion.status !== undefined',respuestaAsignacion.data)
            toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaAsignacion.data}`, life: time*2 });
            return
        }else{        
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Vehiculo asignada correctamente', life: time })
            setTimeout(finalizar,time)
        }
    }
    const quitar = async() =>{
        console.log("Quitar y Terminar")

        let asignacion = {
            employeeId: usuarioSeleccionado.id,
            zoneId: zonaSeleccionado.id,
            carsAsignedNumber: 1,
        }
        let respuestaAsignacion = await deleteZoneToEmployee(asignacion)

        if(respuestaAsignacion.status !== undefined ){
            console.log('respuestaAsignacion.status !== undefined',respuestaAsignacion.data)
            toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaAsignacion.data}`, life: time*2 });
            return
        }else{        
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Vehiculo asignada correctamente', life: time })
            setTimeout(finalizar,time)
        }
        //toast.current.show({severity:'warn', summary:'Se quitó correctamente', detail:`Empleado ${usuarioSeleccionado.lastName} x Zona ${zonaSeleccionado.letter}`});
        //resetearZonaSeleccionado()
        //resetearUsuarioSeleccionado()
        //resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
        //setTimeout(finalizar,1100)
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
                    <Card className='text-center' title="Empleado" style={{ width: '25rem', marginBottom: '2em' }}>
                        <p><b>Codigo Empleado : </b> {usuarioSeleccionado.employeeId}</p>
                        <p><b>Nombre : </b> {usuarioSeleccionado.lastName}, {usuarioSeleccionado.firstName}</p>
                        <p><b>Zonas : </b>
                        {usuarioSeleccionado.zoneEmployee.map(
                            zona => 
                            `[${zona.letter}] `
                        )}
                        </p>
                    </Card>
                </div>
                <div className='m-2'>  
                    <Card className='text-center' title="Zona" style={{ width: '25rem', marginBottom: '2em' }}>
                        <p><b>Letra de la zona : </b> [{zonaSeleccionado.letter}]</p>
                        <p><b>Tipo de vehiculo : </b> {zonaSeleccionado.vehicleType.description}</p>
                        <p><b>Cantidad de vehiculos : </b> dato </p>
                    </Card>
                </div>  
            </div>
            <div className='d-flex justify-content-center'>
                <Button label="Cancelar" className="p-button-raised p-button-danger m-2" onClick={() => cancelar()}/>
                {(!alreadyAsigned())?
                    <Button label="Confirmar Asignación" className="p-button-raised p-button-info m-2" onClick={() => confirmar()}/>
                    :
                    <Button label="Quitar Asignación" className="p-button-raised p-button-danger m-2" onClick={() => quitar()}/>
                }
            </div>
        </div>
         
     );
}
 
export default ConfirmZoneEmployee;