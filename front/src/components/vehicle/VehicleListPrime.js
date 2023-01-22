import React, { useState, useEffect , useRef } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';


import { Toast } from 'primereact/toast';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons


import './DataTableDemo.css';

//Services
import {getVehicleList, getVehicleListByOwner} from '../../service/vehicleService'

//Redux
import {actionSet,subActionSet,stateResetSet} from '../../actions/stateActions'
import {zoneSelectedSet,zoneDeselectedSet} from '../../actions/zoneSeleccionadoActions'
import {userSelectedSet,userDeselectedSet} from '../../actions/usuarioSeleccionadoActions'
import {garageSelectedSet,garageDeselectedSet} from '../../actions/garageSeleccionadoActions'
import {vehicleSelectedSet,vehicleDeselectedSet} from '../../actions/vehiculoSeleccionadoActions'

//util
import {AccionesApp} from '../../types/actionList'

const VehicleListPrime = () => {

    const [miUsuario, setMiUsuario] = useState(JSON.parse(localStorage.getItem("usuarioActual")));

    //Setear en Readux

        //Conocer el estado
        const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
        const zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)
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
 
        const cargarVehicleSeleccionado = usuario => dispatch(vehicleSelectedSet(usuario))
        const resetearVehicleSeleccionado = usuario => dispatch(vehicleDeselectedSet(usuario))
        const cargarZonaSeleccionado = usuario => dispatch(zoneSelectedSet(usuario))
        const resetearZonaSeleccionado = usuario => dispatch(zoneDeselectedSet(usuario))
        const resetearUsuarioSeleccionado = usuario => dispatch(userDeselectedSet(usuario))

        
        const toast = useRef(null);





    const [customers1, setCustomers1] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [loading1, setLoading1] = useState(true);

    const statuses = [
        'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
    ];


    useEffect(() => {
        let vehicleList =[];//= await getUserAdminList()
        const fetchList = async()=>{

            if(miUsuario !== null && miUsuario.role!== null && miUsuario.role.name === "ROLE_ADMIN"){
                vehicleList = await getVehicleList()
            }else{
                vehicleList = await getVehicleListByOwner(miUsuario)
            }
            
            console.log("Prime List vehicle",vehicleList)
            setCustomers1(vehicleList)
            setLoading1(false) 
        }
        fetchList()

        initFilters1();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    //const formatCurrency = (value) => {
    //    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    //}

    const clearFilter1 = () => {
        initFilters1();
    }

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    }  

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'representative': { value: null, matchMode: FilterMatchMode.IN },
            'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
            'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    }



    const renderHeader1 = () => {
        return (
            <div className="p-d-flex p-jc-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                </span>
            </div>
        )
    }

    const header1 = renderHeader1();

    const seleccionar = data =>{
        console.log("Clieck ",data)
        cargarVehicleSeleccionado(data);
    }
    const confirmar = () =>{        
        console.log("Confirmar y seguir")
        console.log(AccionesApp.accionesSocioGarage.confirmarAsignacion)
        //if (estadoPrincipal == AccionesApp.accionesSocioGarage.accionPrincipal){accionSecundaria(AccionesApp.accionesSocioGarage.confirmarAsignacion)}
        //if (estadoPrincipal == AccionesApp.accionesSocioGarage.accionPrincipal){console.log("Confirmar y volver a main")}
    }
    const irConfirmarPartnerVehiculo = () =>{        
        console.log("Confirmar e ir a Finalizar asignación Socio Vehiculo")
        console.log(AccionesApp.accionesSocioVehiculo.confirmarAsignacion)
        if (estadoPrincipal == AccionesApp.accionesSocioVehiculo.accionPrincipal){accionSecundaria(AccionesApp.accionesSocioVehiculo.confirmarAsignacion)}
        if (estadoPrincipal == AccionesApp.accionesSocioVehiculo.accionPrincipal){console.log("Confirmar y volver a main")}
    }
    const irBuscarGarage = () =>{        
        console.log("ir a buscar garage para vehiculo->garage")
        if (estadoPrincipal == AccionesApp.accionesVehiculoGarage.accionPrincipal){accionSecundaria(AccionesApp.accionesVehiculoGarage.busqueda2)}
    }
    const cancelar = () =>{
        console.log("Cancelar")
        resetearVehicleSeleccionado()
        resetearUsuarioSeleccionado()
        resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
    }

    const VolverSocioVehiculo = () =>{
        console.log("Volver")
        resetearVehicleSeleccionado()
        //resetearUsuarioSeleccionado()
        //resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
        if (estadoPrincipal == AccionesApp.accionesSocioVehiculo.accionPrincipal){accionSecundaria(AccionesApp.accionesSocioVehiculo.busqueda1)}
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>                
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2"  />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"  />
            </React.Fragment>
        );
    }

    const stockBodyTemplate = (rowData) => {

        const alreadyAsigned = ()=>{
            let isPresent = false
            if (rowData.owner != null && rowData.owner.dni === usuarioSeleccionado.dni){
                isPresent = true
            }
            return isPresent
        }

        const resultado = alreadyAsigned()

        return (
            <div className={(resultado)?'text-danger':'text-success'}>
                {(resultado)?'Ya pertenece al socio':'No pertenece al socio'}
            </div>
        );
    }

    const vehicleBodyTemplate = (rowData) => {

        return (
            <div>
                {(rowData.vehicle !== null)? rowData.vehicle.plate :'Está disponible'}
            </div>
        );
    }
    const ownerBodyTemplate = (rowData) => {

        return (
            <div>
                {(rowData.owner !== null)? rowData.owner.firstName+", "+rowData.owner.lastName:'Está a la venta'}
            </div>
        );
    }

    return (
        <div className="datatable-filter-demo">
            <div class="container">
                <Toast ref={toast} />
            </div>

            <div className="card">
                <div class="d-flex justify-content-center"><h1>Vehiculos</h1></div>
                <DataTable 
                    value={customers1} 


                    selection={zonaSeleccionado} 
                    onSelectionChange={e => seleccionar(e.value)}

                    paginator className="p-datatable-customers" 
                    showGridlines rows={5}
                    dataKey="id" 
                    filters={filters1} 
                    filterDisplay="menu" 
                    loading={loading1} 
                    responsiveLayout="scroll"
                    globalFilterFields={['plate','lastName', 'vehicleType.description']} 
                    header={header1} 
                    emptyMessage="No customers found.">
                        
                        
                    <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>

                    <Column field="plate" header="Matricula" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="owner.dni" header="Dueño del Vehiculo" body={ownerBodyTemplate} filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="name" header="Nombre" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="vehicleType.description" header="Tipo de vehiculo" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="length" header="Largo (m)" filter filterPlaceholder="Search by length" style={{ minWidth: '12rem' }} />
                    <Column field="width" header="Ancho (m)" filter filterPlaceholder="Search by width" style={{ minWidth: '12rem' }} />

                    {(estadoPrincipal == AccionesApp.accionesSocioVehiculo.accionPrincipal)?
                    <Column field="letter" header="Estado" body={stockBodyTemplate} filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    :null}

                    {(estadoPrincipal == AccionesApp.accionesCrudUsuarios.accionPrincipal)?
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>:null}
                </DataTable> 
                <div className='d-flex justify-content-center'>

                    {(estadoPrincipal === AccionesApp.accionesSocioGarage.accionPrincipal
                    || estadoPrincipal == AccionesApp.accionesVehiculoGarage.accionPrincipal)
                        ?
                        <Button label="Cancelar" className="p-button-raised p-button-danger m-2" onClick={() => cancelar()}/>
                        :
                        null}
                    
                    {(estadoPrincipal === AccionesApp.accionesSocioVehiculo.accionPrincipal
                    )
                        ?<Button label="Volver" className="p-button-raised p-button-info m-2" onClick={() => VolverSocioVehiculo()}/>:null}     

                    {(vehicleSeleccionado != null 
                        &&  estadoPrincipal == AccionesApp.accionesSocioVehiculo.accionPrincipal 
                        && vehicleSeleccionado != null && vehicleSeleccionado.owner.dni != usuarioSeleccionado.dni)
                        ?<Button label="Confirmar" className="p-button-raised p-button-info m-2" onClick={() => irConfirmarPartnerVehiculo()}/>
                        :
                        null}  
                    {(vehicleSeleccionado != null 
                        &&  estadoPrincipal == AccionesApp.accionesVehiculoGarage.accionPrincipal
                        && vehicleSeleccionado != null )
                        ?<Button label="Siguiente" className="p-button-raised p-button-info m-2" onClick={() => irBuscarGarage()}/>
                        :
                        null}  

                                    
                </div>               
            </div>
        </div>
    );
}
      
export default VehicleListPrime