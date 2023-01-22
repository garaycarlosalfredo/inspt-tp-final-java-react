import React , {useEffect, useState} from 'react';
 
import { useSelector} from 'react-redux';

//Listados
import EmployeeListPrime from '../user/list/EmployeeListPrime';
import GarageListPrime from '../garage/GarageListPrime';
import ZoneListPrime from '../zone/ZoneListPrime'
import VehicleListPrime from '../vehicle/VehicleListPrime'

import ConfirmGarageZone from '../ConfirmActions/ConfirmGarageZone'


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

const AsignGarageZone = () => {

    const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
    const vehiculoSeleccionado = useSelector(store=>store.vehiculoSeleccionado.vehicleSelected)
    const zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)
    const garageSeleccionado = useSelector(store=>store.garageSeleccionado.garageSelected)
    const estadoAcciones = useSelector(store=>store.stateActions.stateAction)
    const estadoSubAcciones = useSelector(store=>store.stateActions.stateSubAction)
    /*
    
    */

    return ( 
        <div>
            {(estadoSubAcciones===AccionesApp.accionesGarageZona.busqueda1)?<GarageListPrime></GarageListPrime>:null}  
            {(estadoSubAcciones===AccionesApp.accionesGarageZona.busqueda2)?<ZoneListPrime></ZoneListPrime>:null}
            {(estadoSubAcciones===AccionesApp.accionesGarageZona.confirmarAsignacion)?<ConfirmGarageZone/>:null}
        </div>          
     );
}
 
export default AsignGarageZone;