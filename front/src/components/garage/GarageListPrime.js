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
import {getGarageList,getGarageListByOwner} from '../../service/garageService'

//Redux
import {actionSet,subActionSet,stateResetSet} from '../../actions/stateActions'
import {zoneSelectedSet,zoneDeselectedSet} from '../../actions/zoneSeleccionadoActions'
import {userSelectedSet,userDeselectedSet} from '../../actions/usuarioSeleccionadoActions'
import {garageSelectedSet,garageDeselectedSet} from '../../actions/garageSeleccionadoActions'

//util
import {AccionesApp} from '../../types/actionList'

const EmployeeListPrime = () => {

    const [miUsuario, setMiUsuario] = useState(JSON.parse(localStorage.getItem("usuarioActual")));

    //Setear en Readux

        //Conocer el estado
        const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
        const zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)
        const garageSeleccionado = useSelector(store=>store.garageSeleccionado.garageSelected)
        const vehiculoSeleccionado = useSelector(store=>store.vehiculoSeleccionado.vehicleSelected)
        const estadoPrincipal = useSelector(store=>store.stateActions.stateAction)
        const estadoSecundario = useSelector(store=>store.stateActions.stateSubAction)

    //Setear en Readux
        //utilizar use Dispacthc y te crea una funcion
        const dispatch = useDispatch();
        
        //manda a llamar el action de usuarioActual
        const accionPrincipal = estado => dispatch(actionSet(estado))
        const accionSecundaria = estado => dispatch(subActionSet(estado))
        const resetearAcciones = estado => dispatch(stateResetSet(estado))
 
        const cargarGarageSeleccionado = usuario => dispatch(garageSelectedSet(usuario))
        const resetearGarageSeleccionado = usuario => dispatch(garageDeselectedSet(usuario))
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
        let userList =[];//= await getUserAdminList()
        const fetchList = async()=>{

            if(miUsuario !== null && miUsuario.role!== null && miUsuario.role.name === "ROLE_ADMIN"){
                userList = await getGarageList()
            }else{
                userList = await getGarageListByOwner(miUsuario)
            }
            
            console.log("Prime List garage",userList)

            console.log("Prime List garage",userList)
            setCustomers1(userList)
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
        cargarGarageSeleccionado(data);
    }
    const confirmar = () =>{        
        console.log("Confirmar y seguir")
        console.log(AccionesApp.accionesSocioGarage.confirmarAsignacion)
        if (estadoPrincipal == AccionesApp.accionesSocioGarage.accionPrincipal){accionSecundaria(AccionesApp.accionesSocioGarage.confirmarAsignacion)}
        if (estadoPrincipal == AccionesApp.accionesSocioGarage.accionPrincipal){console.log("Confirmar y volver a main")}
    }

    const irFinalizarVehiculoGarage = () =>{        
        if (estadoPrincipal == AccionesApp.accionesVehiculoGarage.accionPrincipal){accionSecundaria(AccionesApp.accionesVehiculoGarage.confirmarAsignacion)}
    }
    const irGarageZona = () =>{        
        if (estadoPrincipal == AccionesApp.accionesGarageZona.accionPrincipal){accionSecundaria(AccionesApp.accionesGarageZona.busqueda2)}
    }
    const cancelar = () =>{
        console.log("Cancelar")
        resetearGarageSeleccionado()
        resetearUsuarioSeleccionado()
        resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>                
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2"  />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"  />
            </React.Fragment>
        );
    }
    
    const stockBodyTemplateVehiculoGarage = (rowData) => {

        const alreadyAsigned = ()=>{
            console.log('rowData',rowData)
            let isPresent = false
            if (rowData.vehicle != null && rowData.vehicle.plate === vehiculoSeleccionado.plate){
                isPresent = true
            }

            return isPresent
        }

        const resultado = alreadyAsigned()

        return (
            <div className={(resultado)?'text-danger':'text-success'}>
                {(resultado)?'Ya está asignado a esta cochera':'Puede asignar'}
            </div>
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
                {(rowData.vehicle != null)? rowData.vehicle.plate :'Está disponible'}
            </div>
        );
    }
    const ownerBodyTemplate = (rowData) => {

        return (
            <div>
                {(rowData.owner != null)? rowData.owner.firstName+", "+rowData.owner.lastName:'Está a la venta'}
            </div>
        );
    }

    return (
        <div className="datatable-filter-demo">
            <div class="container">
                <Toast ref={toast} />
            </div>

            <div className="card">
                <div class="d-flex justify-content-center"><h1>Garages</h1></div>
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
                    globalFilterFields={['letter','lastName', 'vehicleType.description']} 
                    header={header1} 
                    emptyMessage="No hay datos.">
                        
                        
                    <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>

                    <Column field="id" header="Id" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="owner.dni" header="Dueño del Garage" body={ownerBodyTemplate} filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="vehicle.plate" header="Vehiculo" body={vehicleBodyTemplate} filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="length" header="Largo (m)" filter filterPlaceholder="Search by length" style={{ minWidth: '12rem' }} />
                    <Column field="width" header="Ancho (m)" filter filterPlaceholder="Search by width" style={{ minWidth: '12rem' }} />
                    {(estadoPrincipal === AccionesApp.accionesVehiculoGarage.accionPrincipal)?
                        <Column field="letter" header="Estado" body={stockBodyTemplateVehiculoGarage} filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        :
                        null}
                    {(estadoPrincipal === AccionesApp.accionesSocioGarage.accionPrincipal)?
                        <Column field="letter" header="Estado" body={stockBodyTemplate} filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        :
                        null}
                    <Column field="vehicleType.description" header="Tipo de vehiculo" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    {(estadoPrincipal == AccionesApp.accionesCrudUsuarios.accionPrincipal)?
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>:null}
                </DataTable> 
                <div className='d-flex justify-content-center'>
                   
                    {(estadoPrincipal === AccionesApp.accionesSocioGarage.accionPrincipal
                        || estadoPrincipal === AccionesApp.accionesVehiculoGarage.accionPrincipal
                        || estadoPrincipal === AccionesApp.accionesGarageZona.accionPrincipal
                    )
                        ?<Button label="Cancelar" className="p-button-raised p-button-danger m-2" onClick={() => cancelar()}/>:null}
                    
                    {(estadoPrincipal === AccionesApp.accionesCrudUsuarios.accionPrincipal
                    || estadoPrincipal === AccionesApp.accionesCrudVehiculos.accionPrincipal
                    )
                        ?<Button label="Volver" className="p-button-raised p-button-info m-2" onClick={() => cancelar()}/>:null}      

                    {(garageSeleccionado != null && estadoPrincipal == AccionesApp.accionesSocioGarage.accionPrincipal)
                        ?<Button label="Confirmar" className="p-button-raised p-button-info m-2" onClick={() => confirmar()}/>:null}

                    {(garageSeleccionado != null && estadoPrincipal == AccionesApp.accionesVehiculoGarage.accionPrincipal)
                        ?<Button label="Confirmar" className="p-button-raised p-button-info m-2" onClick={() => irFinalizarVehiculoGarage()}/>:null}

                    {(garageSeleccionado != null && estadoPrincipal == AccionesApp.accionesGarageZona.accionPrincipal)
                        ?<Button label="Confirmar" className="p-button-raised p-button-info m-2" onClick={() => irGarageZona()}/>:null}

              
                </div>               
            </div>
        </div>
    );
}
      
export default EmployeeListPrime