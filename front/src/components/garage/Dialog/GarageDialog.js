
import React, { useState , useEffect , useRef} from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { useForm, Controller } from 'react-hook-form';
import { InputSwitch } from 'primereact/inputswitch';

//Redux
import { useDispatch , useSelector} from 'react-redux';
import {garageSelectedSet,garageDeselectedSet} from '../../../actions/garageSeleccionadoActions'
import {updateUserListSet} from '../../../actions/usuarioModificadoActions'

import './DialogDemo.css';


//Services
import {getTypeVehicleList} from '../../../service/vehicleService'
import {createGarage,updateGarage} from '../../../service/garageService'
import {getZoneList} from '../../../service/zoneService'


const GarageDialog = () => {

    const time = 2000
    //Setear en Readux

        //Conocer el estado
        let garageSeleccionado = useSelector(store=>store.garageSeleccionado.garageSelected)

        //Obtener lista de usuarios
        const listaUsuarios = useSelector(store=>store.usuarioModificado.userList)

    //Setear en Readux
        //utilizar use Dispacthc y te crea una funcion
        const dispatch = useDispatch();
        
        //manda a llamar el action de usuarioActual
        const resetearGarageSeleccionado = usuario => dispatch(garageDeselectedSet(usuario))

        //modificado para lista
        const userListSet = lista => dispatch(updateUserListSet(lista))

    //Si se crea un usuario nuevo usuarioSeleccinado es null entonces se carga con un usuario vacío
    if(garageSeleccionado.nuevo ===true){
        garageSeleccionado = {
            lightMeter: 0,
            maintenance: 0,
            plate: null,
            ownerDni: null,
            typeId: null,
            zoneId: null,
            width: 1,
            length: 1,
            nuevo: true
        }
    }

    const [garage, setGarage] = useState(garageSeleccionado);
    const [roleList, setRoleList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const [zoneList, setSoneList] = useState([]);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const [submitted, setSubmitted] = useState(false);
    
    const [mantenimiento, setMantenimiento] = useState(false);

    
    const toast = useRef(null);


    const getTypeList = async e =>{
        const res = await getTypeVehicleList()
        setTypeList(res)
    }
    const getZones = async e =>{
        const res = await getZoneList()
        setSoneList(res)
    }
    

    const emptyUser = {
        lightMeter: 0,
        maintenance: 0,
        plate: null,
        ownerDni: null,
        typeId: null,
        zoneId: null,
        width: 1,
        length: 1,
        nuevo: true
    }

    useEffect(() => {
        getTypeList()
        getZones()
        if(garageSeleccionado != null && garageSeleccionado.editar === true){
            setGarage(garageSeleccionado)
            onClick('displayResponsive')
        }else{
            setGarage(emptyUser)
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
        resetearGarageSeleccionado()
        dialogFuncMap[`${name}`](false);
    }

    const checkRequired = (garage)=>{
        setSubmitted(true);
        

        console.log('garage',garage)
        if(garage.typeId === {} || garage.typeId === -1 || garage.typeId === null) return true
        if(garage.zoneId === {} || garage.zoneId === -1 || garage.zoneId === null) return true
        if(garage.length <= 1) return true
        if(garage.width <= 1) return true
        //if(garage.name === ''){return true}
        //if(garage.ownerDni === 0 || !Number.isInteger(garage.ownerDni) ){return true}
        console.log('garage 2',garage)

        
        return false
    }

    const onUpdate = async (name) => {
        if(checkRequired(garage))return

        let index = listaUsuarios.findIndex(u => u.id === garage.id)

        if (listaUsuarios[index] != garage){
        
            let respuestaActualizacion = await updateGarage(garage)

            if(respuestaActualizacion.status != undefined){
                console.log(respuestaActualizacion.data)
                toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaActualizacion.data}`, life: time });
                return
            }
            
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Usuario Modificado', life: time })
            

            listaUsuarios[index] = garage
            userListSet(listaUsuarios)
            setTimeout(()=>{resetearGarageSeleccionado()}, time)
        }else{
            resetearGarageSeleccionado()
        }

        dialogFuncMap[`${name}`](false)
    }

    const onSave = async (name) => {   
        if(checkRequired(garage))return
        let respuestaCreacion = await createGarage(garage)
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
        let _user = {...garage};
        _user[`${name}`] = val;
        setGarage(_user);
    }
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _user = {...garage};
        _user[`${name}`] = val;
        setGarage(_user);
    }
    const onInputFloatChange = (e, name) => {
        const val = e.target.value ;
        let _user = {...garage};
        _user[`${name}`] = val;
        setGarage(_user);
    }

    const onSelectTypeChange = async (e,name) =>{        
        if(e.target.value === -1) return
        const type = JSON.parse(e.target.value)        
        const val = type.id;
        let _garage = {...garage};
        _garage[`${name}`] = val;
        setGarage(_garage);
    }

    const onSelectZoneChange = async (e,name) =>{        
        if(e.target.value === -1 || e.target.value === null) return
        const type = JSON.parse(e.target.value)        
        const val = type.id;
        let _garage = {...garage};
        _garage[`${name}`] = val;
        setGarage(_garage);
    }

    const onSwitchMantenimientoChange = async (e,name) =>{
        let val = 0
        if(e.target.value === true){val =  1}
        //const val = e.target.value
        let _garage = {...garage};
        _garage[`${name}`] = val;
        
        setGarage(_garage);
        setMantenimiento(e.target.value);
    }

    const renderFooter = (name) => {
        console.log(garageSeleccionado)
        return (

            <div>
                {(garageSeleccionado.nuevo === true)?<Button label="Guardar" icon="pi pi-save" onClick={() => onSave(name)} autoFocus />:null}
                {(garageSeleccionado.editar === true)?<Button label="Actualizar" icon="pi pi-save" onClick={() => onUpdate(name)} autoFocus />:null}
            </div>
        );
    }

    return (
        <div>
        <Toast ref={toast} />
        <div className="dialog-demo">            
            <div className="card">
                
                <Dialog header="Garage" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooter('displayResponsive')}>
                    
                    
                    <div className="p-field">
                        <h5>Medidor de luz</h5>                   
                            <InputText id="lightMeter" value={garage.lightMeter} keyfilter="num" onChange={(e) => onInputFloatChange(e, 'lightMeter')} autoFocus />
                    </div>  
                    <div className="p-field">
                        <h5>Mantenimiento</h5>                        
                        <InputSwitch id="lightMeter" checked={mantenimiento} onChange={(e) => onSwitchMantenimientoChange(e,'maintenance')} /> 
                    </div>                     
                    {(false)?<div className="p-field">
                        <h5>Matrícula</h5>                   
                            <InputText id="plate" value={garage.plate} onChange={(e) => onInputChange(e, 'plate')} autoFocus />
                    </div>:null}
                    <div className="field col">
                        <h5>Dni del usuario asignado</h5>
                        <InputNumber id="ownerDni" value={garage.ownerDni} onValueChange={(e) => onInputNumberChange(e, 'ownerDni')} mode="decimal" />       
                    </div>
                    
                    <div className="p-field">
                        <h5>Ancho</h5>                   
                            <InputText id="width" value={garage.width} keyfilter="num" onChange={(e) => onInputFloatChange(e, 'width')} required autoFocus className={classNames({ 'p-invalid': submitted && !garage.width })} />
                            {submitted && garage.width <= 1 && <small className="p-error">El campo es necesario.</small>}   
                    </div>       
                    <div className="p-field">
                        <h5>Largo</h5>                   
                            <InputText id="length" value={garage.length} keyfilter="num" onChange={(e) => onInputFloatChange(e, 'length')} required autoFocus className={classNames({ 'p-invalid': submitted && !garage.length })} />
                            {submitted && garage.length <= 1 && <small className="p-error">El campo es necesario.</small>}   
                    </div>  

                    <div className="p-field">
                        <h5>Tipos de vehiculos</h5>
                        <select  class="form-select " aria-label=".form-select-sm example" onChange={(e) => onSelectTypeChange(e, 'typeId')} required >                                                       
                            <option defaultValue value={JSON.stringify({id:2})}>Seleccione el tipo de vehiculo</option>
                            {typeList.map(type => 
                                <option value= {JSON.stringify(type)} >{type.description}</option>
                            )}
                        </select>
                        {submitted && garage.typeId === null && <small className="p-error">Tipo de vehiculo es necesario.</small>}
                    </div>

                    <div className="p-field">
                        <h5>Zona del garage</h5>
                        <select  class="form-select " aria-label=".form-select-sm example" onChange={(e) => onSelectZoneChange(e, 'zoneId')} required >                                                       
                            <option defaultValue value={JSON.stringify({id:2})}>Seleccione la zona</option>
                            {zoneList.map(type => 
                                <option value= {JSON.stringify(type)} >{type.letter}</option>
                            )}
                        </select>
                        {submitted && garage.zoneId === null && <small className="p-error">Zona es necesario.</small>}
                    </div>


                </Dialog>   
            </div>
        </div>
        </div>
    )
}

export default GarageDialog