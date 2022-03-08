import React , {useEffect, useState} from 'react';
 
import { useSelector} from 'react-redux';

//Listados
import EmployeeListPrime from '../user/list/EmployeeListPrime';
import PartnerListPrime from '../user/list/PartnerListPrime';
import ZoneListPrime from '../zone/ZoneListPrime'
import VehicleListPrime from '../vehicle/VehicleListPrime'

import ConfirmPartnerVehicle from '../ConfirmActions/ConfirmPartnerVehicle'


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

const AsignPartnerVehicle = () => {

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
            AsignPartnerVehicle
            {(estadoSubAcciones===AccionesApp.accionesSocioVehiculo.busqueda1)?<PartnerListPrime></PartnerListPrime>:null}
            {(estadoSubAcciones===AccionesApp.accionesSocioVehiculo.busqueda2)?<VehicleListPrime></VehicleListPrime>:null}  
            {(estadoSubAcciones===AccionesApp.accionesSocioVehiculo.confirmarAsignacion)?<ConfirmPartnerVehicle/>:null}
        </div>          
     );
}
 
export default AsignPartnerVehicle;