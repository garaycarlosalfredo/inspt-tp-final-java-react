import React , {useEffect, useState} from 'react';
 
import { useSelector} from 'react-redux';

import AccordionAdmin from './admin/accordionAdmin';
import AsignEmplZone from './AsignEmplZone';
import AsignPartnerGarage from './AsignPartnerGarage'
import AsignPartnerVehicle from './ConfirmActions/AsignPartnerVehicle'
import AsignVehicleGarage from './ConfirmActions/AsignVehicleGarage'
import AsignGarageZone from './ConfirmActions/AsignGarageZone'


import CrudUserListPrime from './user/list/CrudUserListPrime';
import CrudVehicleListPrime from './vehicle/list/CrudVehicleListPrime';
import CrudGarageListPrime from './garage/list/CrudGarageListPrime';
import CrudZoneListPrime from './zone/list/CrudZoneListPrime';

//Prime Faces import

import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';

//Estilos PrimeFaces
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

//util
import {AccionesApp} from '../types/actionList'

const MainAdmin = () => {

    const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
    const vehiculoSeleccionado = useSelector(store=>store.vehiculoSeleccionado.vehicleSelected)
    const zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)
    const garageSeleccionado = useSelector(store=>store.garageSeleccionado.garageSelected)
    const estadoAcciones = useSelector(store=>store.stateActions.stateAction)
    console.log(estadoAcciones)
    console.log(AccionesApp.accionesSocioGarage.accionPrincipal)

    return ( 
        <div>
            {(estadoAcciones===AccionesApp.accionesHome.accionPrincipal)?<AccordionAdmin></AccordionAdmin>:null}
            {(estadoAcciones===AccionesApp.accionesEmpleadoZona.accionPrincipal)?<AsignEmplZone></AsignEmplZone>:null}
            {(estadoAcciones===AccionesApp.accionesSocioGarage.accionPrincipal)?<AsignPartnerGarage></AsignPartnerGarage>:null}
            {(estadoAcciones===AccionesApp.accionesSocioVehiculo.accionPrincipal)?<AsignPartnerVehicle></AsignPartnerVehicle>:null}
            {(estadoAcciones===AccionesApp.accionesGarageZona.accionPrincipal)?<AsignGarageZone></AsignGarageZone>:null}
            {(estadoAcciones===AccionesApp.accionesVehiculoGarage.accionPrincipal)?<AsignVehicleGarage></AsignVehicleGarage>:null}
            {(estadoAcciones===AccionesApp.accionesCrudUsuarios.accionPrincipal)?<CrudUserListPrime></CrudUserListPrime>:null}
            {(estadoAcciones===AccionesApp.accionesCrudVehiculos.accionPrincipal)?<CrudVehicleListPrime></CrudVehicleListPrime>:null}
            {(estadoAcciones===AccionesApp.accionesCrudGarage.accionPrincipal)?<CrudGarageListPrime></CrudGarageListPrime>:null}
            {(estadoAcciones===AccionesApp.accionesCrudZona.accionPrincipal)?<CrudZoneListPrime></CrudZoneListPrime>:null}  
            
        </div>          
     );
}
 
export default MainAdmin;