
import React, { useState , useEffect , useRef} from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { useForm, Controller } from 'react-hook-form';

//Redux
import { useDispatch , useSelector} from 'react-redux';
import {vehicleSelectedSet,vehicleDeselectedSet} from '../../../actions/vehiculoSeleccionadoActions'
import {updateUserListSet} from '../../../actions/usuarioModificadoActions'

import './DialogDemo.css';


//Services
import {getTypeVehicleList,createVehicle, updateVehicle} from '../../../service/vehicleService'


const VehicleDialog = () => {

    const time = 2000
    //Setear en Readux

        //Conocer el estado
        let vehiculoSeleccionado = useSelector(store=>store.vehiculoSeleccionado.vehicleSelected)

        //Obtener lista de usuarios
        const listaUsuarios = useSelector(store=>store.usuarioModificado.userList)

    //Setear en Readux
        //utilizar use Dispacthc y te crea una funcion
        const dispatch = useDispatch();
        
        //manda a llamar el action de usuarioActual
        const resetearVehiculoSeleccionado = usuario => dispatch(vehicleDeselectedSet(usuario))

        //modificado para lista
        const userListSet = lista => dispatch(updateUserListSet(lista))

    //Si se crea un usuario nuevo usuarioSeleccinado es null entonces se carga con un usuario vacío
    if(vehiculoSeleccionado.nuevo ===true){
        vehiculoSeleccionado = {
            plate: '',
            name: '',
            typeId: 1,
            width: 1,
            length: 1,
            ownerDni: null,
            nuevo: true
        }
    }

    const [vehicle, setVehicle] = useState(vehiculoSeleccionado);
    const [roleList, setRoleList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const [submitted, setSubmitted] = useState(false);

    
    const toast = useRef(null);


    const getTypeList = async e =>{
        const res = await getTypeVehicleList()
        setTypeList(res)
    }

    const emptyUser = {
        plate: '',
        name: '',
        typeId: 1,
        width: 1,
        length: 1,
        ownerDni: null
    }

    useEffect(() => {
        getTypeList()
        if(vehiculoSeleccionado != null && vehiculoSeleccionado.editar === true){
            setVehicle(vehiculoSeleccionado)
            onClick('displayResponsive')
        }else{
            setVehicle(emptyUser)
            onClick('displayResponsive')
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    



    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        resetearVehiculoSeleccionado()
        dialogFuncMap[`${name}`](false);
    }

    const checkRequired = (vehicle)=>{
        setSubmitted(true);
        

        console.log('vehicle',vehicle)
        if(vehicle.typeId === {} || vehicle.typeId === -1 ) return true
        if(vehicle.name === ''){return true}
        if(vehicle.ownerDni === 0 || !Number.isInteger(vehicle.ownerDni) ){return true}        
        if(vehicle.length <= 1) return true
        if(vehicle.width <= 1) return true

        
        return false
    }

    const onUpdate = async (name) => {
        if(checkRequired(vehicle))return

        let index = listaUsuarios.findIndex(u => u.id === vehicle.id)

        if (listaUsuarios[index] != vehicle){
        
            let respuestaActualizacion = await updateVehicle(vehicle)

            if(respuestaActualizacion.status != undefined){
                console.log(respuestaActualizacion.data)
                toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaActualizacion.data}`, life: time });
                return
            }
            
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Usuario Modificado', life: time })
            

            listaUsuarios[index] = vehicle
            userListSet(listaUsuarios)
            setTimeout(()=>{resetearVehiculoSeleccionado()}, time)
        }else{
            resetearVehiculoSeleccionado()
        }

        dialogFuncMap[`${name}`](false)
    }

    const onSave = async (name) => {   
        if(checkRequired(vehicle))return
        let respuestaCreacion = await createVehicle(vehicle)
        console.log("onSave",respuestaCreacion)

        if(respuestaCreacion.status != null && respuestaCreacion.status != 200){ 
            toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaCreacion.data}`, life: time });
            return
        }else{
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Vehiculo Agregado', life: time });
        }


        setTimeout(()=>{onHide('displayResponsive')}, time)
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = {...vehicle};
        _user[`${name}`] = val;
        setVehicle(_user);
    }
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _user = {...vehicle};
        _user[`${name}`] = val;
        setVehicle(_user);
    }
    const onInputFloatChange = (e, name) => {
        const val = e.target.value ;
        let _user = {...vehicle};
        _user[`${name}`] = val;
        setVehicle(_user);
    }
    const renderFooter = (name) => {
        return (

            <div>
                {(vehiculoSeleccionado.nuevo == true)?<Button label="Guardar" icon="pi pi-save" onClick={() => onSave(name)} autoFocus />:null}
                {(vehiculoSeleccionado.editar == true)?<Button label="Actualizar" icon="pi pi-save" onClick={() => onUpdate(name)} autoFocus />:null}
            </div>
        );
    }



    const onSelectRoleChange = async (e,name) =>{
        
        if(e.target.value === -1) return
        const type = JSON.parse(e.target.value)        
        const val = type.id;
        let _vehicle = {...vehicle};
        _vehicle[`${name}`] = val;
        setVehicle(_vehicle);
    }


    return (
        <div>
        <Toast ref={toast} />
        <div className="dialog-demo">            
            <div className="card">
                


                <Dialog header="Vehiculo" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooter('displayResponsive')}>
                    
                    
                    <div className="p-field">
                        <h5>Nombre</h5>                   
                            <InputText id="name" value={vehicle.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehicle.name })} />
                            {submitted && !vehicle.name && <small className="p-error">El campo es necesario.</small>}   
                    </div>
                    <div className="p-field">
                        <h5>Matrícula</h5>                   
                            <InputText id="plate" value={vehicle.plate} onChange={(e) => onInputChange(e, 'plate')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehicle.plate })} />
                            {submitted && !vehicle.plate && <small className="p-error">El campo es necesario.</small>}   
                    </div>
                    <div className="field col">
                        <h5>Dni del usuario asignado</h5>
                        <InputNumber id="ownerDni" value={vehicle.ownerDni} onValueChange={(e) => onInputNumberChange(e, 'ownerDni')} mode="decimal" />
                        {submitted && !vehicle.ownerDni && <small className="p-error">Dni es necesario y debe deben ser solo numeros.</small>}                   
                    </div>
                    
                    <div className="p-field">
                        <h5>Ancho</h5>                   
                            <InputText id="width" value={vehicle.width} keyfilter="num" onChange={(e) => onInputFloatChange(e, 'width')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehicle.width })} />
                            {submitted && vehicle.width <= 1 && <small className="p-error">El campo es necesario.</small>}   
                    </div>       
                    <div className="p-field">
                        <h5>Largo</h5>                   
                            <InputText id="length" value={vehicle.length} keyfilter="num" onChange={(e) => onInputFloatChange(e, 'length')} required autoFocus className={classNames({ 'p-invalid': submitted && !vehicle.length })} />
                            {submitted && vehicle.length <= 1 && <small className="p-error">El campo es necesario.</small>}   
                    </div>  

                    <div className="p-field">
                        <h5>Tipos de vehiculos</h5>
                        <select  class="form-select " aria-label=".form-select-sm example" onChange={(e) => onSelectRoleChange(e, 'typeId')} required >

                                                       
                            <option defaultValue value={JSON.stringify({id:2})}>Seleccione un rol</option>

                            {typeList.map(type => 
                                <option value= {JSON.stringify(type)} >{type.description}</option>
                            )}
                        </select>
                        {submitted && vehicle.roleId === -1 && <small className="p-error">Rol es necesario.</small>}
                    </div>


                </Dialog>   
            </div>
        </div>
        </div>
    )
}

export default VehicleDialog