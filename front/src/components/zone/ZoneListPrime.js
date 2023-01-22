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
import {getZoneList,getZoneEmployeeList} from '../../service/zoneService'

//Redux
import {actionSet,subActionSet,stateResetSet} from '../../actions/stateActions'
import {zoneSelectedSet,zoneDeselectedSet} from '../../actions/zoneSeleccionadoActions'
import {userSelectedSet,userDeselectedSet} from '../../actions/usuarioSeleccionadoActions'

//util
import {AccionesApp} from '../../types/actionList'

const EmployeeListPrime = () => {

    const [miUsuario, setMiUsuario] = useState(JSON.parse(localStorage.getItem("usuarioActual")));

    //Setear en Readux

        //Conocer el estado
        const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
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

            

            
            var zoneOfEmployee = []
            if(miUsuario !== null && miUsuario.role!== null && miUsuario.role.name === "ROLE_EMPLOYEE"){

                userList = await getZoneEmployeeList(miUsuario)
            }else{
                userList = await getZoneList()
            }
            

            console.log("Prime List zone userList",userList)
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
        cargarZonaSeleccionado(data);
    }
    const confirmar = () =>{
        console.log("Confirmar y seguir")
        if (estadoPrincipal === AccionesApp.accionesEmpleadoZona.accionPrincipal){accionSecundaria(AccionesApp.accionesEmpleadoZona.confirmarAsignacion)}
        if (estadoPrincipal === AccionesApp.accionesCrudUsuarios.accionPrincipal){console.log("Confirmar y volver a main")}

    }
    const irFinalizarGarageZona = () =>{        
        if (estadoPrincipal === AccionesApp.accionesGarageZona.accionPrincipal){accionSecundaria(AccionesApp.accionesGarageZona.confirmarAsignacion)}
    }
    const cancelar = () =>{
        console.log("Cancelar")
        resetearZonaSeleccionado()
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

    const stockBodyTemplate = (rowData) => {

        const alreadyAsigned = ()=>{
            var isPresent = false
            if (estadoPrincipal === AccionesApp.accionesEmpleadoZona.accionPrincipal
                || estadoPrincipal === AccionesApp.accionesCrudUsuarios.accionPrincipal
                ){
                usuarioSeleccionado.zoneEmployee.forEach(element => {
                    if (element.letter === rowData.letter){ isPresent = true}
                });
            }

            if (estadoPrincipal === AccionesApp.accionesGarageZona.accionPrincipal){
                if (garageSeleccionado.zone != null && garageSeleccionado.zone.id === rowData.id) isPresent = true
            }

            if(miUsuario.role!== null && miUsuario.role.name === "ROLE_EMPLOYEE"){isPresent = true}

            console.log(isPresent)
            return isPresent
        }
        const resultado = alreadyAsigned()

        const stockClassName = classNames({
            'outofstock': !resultado,
            'lowstock': rowData.quantity > 0 && rowData.quantity < 10,
            'instock': resultado
        });

        return (
            <div className={(resultado)?'text-danger':'text-success'}>
                {(resultado)?'Ya está asignado':'No está asignado'}
            </div>
        );
    }

    return (
        <div className="datatable-filter-demo">
            <div class="container">
                <Toast ref={toast} />
            </div>

            <div className="card">
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
                    emptyMessage="No customers found.">
                        
                        
                    <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>

                    <Column field="letter" header="Letra" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="vehicleType.description" header="Tipo de vehiculos" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="vehicleQuantity" header="Cantidad de autos" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="letter" header="Estado" body={stockBodyTemplate} filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    {(estadoPrincipal === AccionesApp.accionesCrudUsuarios.accionPrincipal)?
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>:null}
                </DataTable> 
                <div className='d-flex justify-content-center'>

                    {(estadoPrincipal === AccionesApp.accionesEmpleadoZona.accionPrincipal
                    || (AccionesApp.accionesGarageZona.accionPrincipal && miUsuario.role!== null && miUsuario.role.name !== "ROLE_EMPLOYEE")
                    )
                        ?<Button label="Cancelar" className="p-button-raised p-button-danger m-2" onClick={() => cancelar()}/>:null}
                    
                    {(estadoPrincipal === AccionesApp.accionesCrudUsuarios.accionPrincipal)
                        ?<Button label="Volver" className="p-button-raised p-button-info m-2" onClick={() => cancelar()}/>:null}

                    {(zonaSeleccionado != null && estadoPrincipal === AccionesApp.accionesEmpleadoZona.accionPrincipal)
                        ?<Button label="Confirmar" className="p-button-raised p-button-info m-2" onClick={() => confirmar()}/>:null}
                    
                    {(zonaSeleccionado != null && estadoPrincipal === AccionesApp.accionesGarageZona.accionPrincipal)
                        ?<Button label="Confirmar" className="p-button-raised p-button-info m-2" onClick={() => irFinalizarGarageZona()}/>:null}
           
                </div>               
            </div>
        </div>
    );
}
      
export default EmployeeListPrime