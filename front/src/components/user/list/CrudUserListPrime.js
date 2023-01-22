import React, { useState, useEffect } from 'react';
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
import { Dialog } from 'primereact/dialog';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

import './DataTableDemo.css';

//Services
import {deleteUser,getUserList} from '../../../service/userService'

//Componentes
import UserDialog from '../Dialog/UserDialog'

//Redux
import {actionSet,subActionSet,stateResetSet} from '../../../actions/stateActions'
import {userSelectedSet,userDeselectedSet} from '../../../actions/usuarioSeleccionadoActions'
import {updateUserListSet} from '../../../actions/usuarioModificadoActions'

//util
import {AccionesApp} from '../../../types/actionList'

const CrudUserListPrime = () => {


    //Obtener en Readux

        //Conocer el estado
        const usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)
        const estadoPrincipal = useSelector(store=>store.stateActions.stateAction)
        const estadoSecundario = useSelector(store=>store.stateActions.stateSubAction)

    //Setear en Readux
        //utilizar use Dispacthc y te crea una funcion
        const dispatch = useDispatch();
        
        //manda a llamar el action de usuarioActual
        const accionPrincipal = estado => dispatch(actionSet(estado))
        const accionSecundaria = estado => dispatch(subActionSet(estado))
        const resetearAcciones = estado => dispatch(stateResetSet(estado))
        
        const cargarUsuarioSeleccionado = usuario => dispatch(userSelectedSet(usuario))
        const resetearUsuarioSeleccionado = usuario => dispatch(userDeselectedSet(usuario))

        //modificado para lista
        const userListSet = lista => dispatch(updateUserListSet(lista))

    const [customers1, setCustomers1] = useState(null);
    const [customers2, setCustomers2] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [filters2, setFilters2] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'representative': { value: null, matchMode: FilterMatchMode.IN },
        'status': { value: null, matchMode: FilterMatchMode.EQUALS },
        'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const [visualizacion, setVisualizacion] = useState(false);
    //Confirm Delete
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    
    const representatives = [
        {name: "Amy Elsner", image: 'amyelsner.png'},
        {name: "Anna Fali", image: 'annafali.png'},
        {name: "Asiya Javayant", image: 'asiyajavayant.png'},
        {name: "Bernardo Dominic", image: 'bernardodominic.png'},
        {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
        {name: "Ioni Bowcher", image: 'ionibowcher.png'},
        {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
        {name: "Onyama Limba", image: 'onyamalimba.png'},
        {name: "Stephen Shaw", image: 'stephenshaw.png'},
        {name: "XuXue Feng", image: 'xuxuefeng.png'}
    ];

    const statuses = [
        'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
    ];


    useEffect(() => {
        let userList =[];//= await getUserAdminList()
        const fetchList = async()=>{
            userList = await getUserList()
            console.log("Prime List user",userList)
            userListSet(userList)
            setCustomers1(userList)
            setLoading1(false) 
        }
        fetchList()

        initFilters1();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

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


    const filterClearTemplate = (options) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
    }

    const filterApplyTemplate = (options) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>
    }

    const filterFooterTemplate = () => {
        return <div className="p-px-3 p-pt-0 p-pb-3 p-text-center p-text-bold">Customized Buttons</div>;
    }

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;
        return (
            <React.Fragment>
                <img alt={representative.name} src={`images/avatar/${representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{representative.name}</span>
            </React.Fragment>
        );
    }

    const representativeFilterTemplate = (options) => {
        return <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />;
    }

    const representativesItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`images/avatar/${option.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{option.name}</span>
            </div>
        );
    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

   

    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />
    }

    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    }

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.activity} showValue={false}></ProgressBar>;
    }

    const activityFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="p-m-3"></Slider>
                <div className="p-d-flex p-ai-center p-jc-between p-px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        )
    }

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', {'true-icon pi-check-circle': rowData.verified, 'false-icon pi-times-circle': !rowData.verified})}></i>;
    }

    const verifiedFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />
    }

    const representativeRowFilterTemplate = (options) => {
        return <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterApplyCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" maxSelectedLabels={1} />;
    }

    const statusRowFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const verifiedRowFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterApplyCallback(e.value)} />
    }

    const header1 = renderHeader1();

    const seleccionar = data =>{
        console.log("Clieck ",data)
        cargarUsuarioSeleccionado(data);
    }
    const confirmar = () =>{
        console.log("Confirmar y seguir")
        if (estadoPrincipal == AccionesApp.accionesEmpleadoZona.accionPrincipal){accionSecundaria(AccionesApp.accionesEmpleadoZona.busqueda2)}
        if (estadoPrincipal == AccionesApp.accionesCrudUsuarios.accionPrincipal){console.log("Confirmar y volver a main")}

    }
    const cancelar = () =>{
        console.log("Cancelar")
        resetearUsuarioSeleccionado()
        resetearAcciones(AccionesApp.accionesHome.accionPrincipal)
    }

    const editarEmpleado= (rowData)=>{
        console.log("Editar empelado",rowData)
        rowData.editar = true
        seleccionar(rowData)
    }

 
    const eliminarEmpleado= async()=>{
        console.log("eliminar usuario",usuarioSeleccionado)

        const res = await deleteUser(usuarioSeleccionado)
        console.log('res',res)

        if ( res.status != null ){
            hideDeleteProductDialog()
            //toast.current.show({ severity: 'error', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            return
        }else{
            function arrayRemove(arr, value) {
                return arr.filter(function(ele){ 
                    return ele != value; 
                });
            }            
            var result = arrayRemove(customers1, usuarioSeleccionado);
            setCustomers1(result)
            hideDeleteProductDialog()
        }
        
        //toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }
    const hideDeleteProductDialog = () => {
        resetearUsuarioSeleccionado()
        setDeleteProductDialog(false);
    }
    const confirmDeleteProduct = (user) => {
        user.editar = false
        cargarUsuarioSeleccionado(user)
        setDeleteProductDialog(true);
    }
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={eliminarEmpleado} />
        </React.Fragment>
    );
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>                
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editarEmpleado(rowData)}/>
                {(rowData.id !== 1)?<Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />:null}
            </React.Fragment>
        );
    }

    return (
        <div className="datatable-filter-demo">
            <div className="card">
                { (usuarioSeleccionado != null && usuarioSeleccionado.editar === true) ? <UserDialog></UserDialog> : null}
                
                <DataTable 
                    value={customers1} 


                    selection={usuarioSeleccionado} 
                    onSelectionChange={e => seleccionar(e.value)}

                    paginator className="p-datatable-customers" 
                    showGridlines rows={5}
                    dataKey="id" 
                    filters={filters1} 
                    filterDisplay="menu" 
                    loading={loading1} 
                    responsiveLayout="scroll"
                    globalFilterFields={['firstName','lastName', 'role.description','dni']} 
                    header={header1} 
                    emptyMessage="No customers found.">
                        
                        
                    <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>

                    <Column field="dni" header="Dni" filter filterPlaceholder="Dni" style={{ minWidth: '12rem' }} />
                    <Column field="firstName" header="Nombre" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="lastName" header="Apellido" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="role.description" header="RolEmpl" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    {(estadoPrincipal === AccionesApp.accionesCrudUsuarios.accionPrincipal)?
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>:null}
                </DataTable> 
                <div className='d-flex justify-content-center'>
                    {(usuarioSeleccionado != null && estadoPrincipal == AccionesApp.accionesEmpleadoZona.accionPrincipal)
                        ?<Button label="Confirmar" className="p-button-raised p-button-info m-2" onClick={() => confirmar()}/>:null}

                    {(estadoPrincipal === AccionesApp.accionesEmpleadoZona.accionPrincipal)
                        ?<Button label="Cancelar" className="p-button-raised p-button-danger m-2" onClick={() => cancelar()}/>:null}
                    
                    {(estadoPrincipal === AccionesApp.accionesCrudUsuarios.accionPrincipal)
                        ?<Button label="Volver" className="p-button-raised p-button-info m-2" onClick={() => cancelar()}/>:null}                    
                </div>               
            </div>
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {usuarioSeleccionado && <span>Seguro eliminar usuario <b>{usuarioSeleccionado.firstName} {usuarioSeleccionado.lastName}</b>?</span>}
                </div>
            </Dialog>

            
        </div>
    );
}
      
export default CrudUserListPrime