import React , {useEffect, useState} from 'react';
 
import { useSelector} from 'react-redux';

import AccordionPartner from './partner/accordionPartner';
import AsignEmplZone from './AsignEmplZone';
import AsignPartnerGarage from './AsignPartnerGarage'
import AsignPartnerVehicle from './ConfirmActions/AsignPartnerVehicle'
import AsignVehicleGarage from './ConfirmActions/AsignVehicleGarage'
import AsignGarageZone from './ConfirmActions/AsignGarageZone'


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


const MainPartner  = () => {

    const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
    const vehiculoSeleccionado = useSelector(store=>store.vehiculoSeleccionado.vehicleSelected)
    const zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)
    const garageSeleccionado = useSelector(store=>store.garageSeleccionado.garageSelected)
    const estadoAcciones = useSelector(store=>store.stateActions.stateAction)
    console.log('estadoAcciones',estadoAcciones)
    console.log('accionPrincipal',AccionesApp.accionesSocioGarage.accionPrincipal)

    return ( 
        <div>
            <AccordionPartner></AccordionPartner>            
        </div>          
     );
}
 
export default  MainPartner;