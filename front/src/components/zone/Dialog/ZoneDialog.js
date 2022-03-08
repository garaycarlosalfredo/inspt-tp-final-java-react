
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
import {zoneSelectedSet,zoneDeselectedSet} from '../../../actions/zoneSeleccionadoActions'
import {updateUserListSet} from '../../../actions/usuarioModificadoActions'

import './DialogDemo.css';


//Services
import {getTypeVehicleList} from '../../../service/vehicleService'
import {getZoneList,createZone, updateZone} from '../../../service/zoneService'


const ZoneDialog = () => {

    const time = 2000
    //Setear en Readux

        //Conocer el estado
        let zonaSeleccionado = useSelector(store=>store.zonaSeleccionado.zoneSelected)

        //Obtener lista de usuarios
        const listaUsuarios = useSelector(store=>store.usuarioModificado.userList)

    //Setear en Readux
        //utilizar use Dispacthc y te crea una funcion
        const dispatch = useDispatch();
        
        //manda a llamar el action de usuarioActual
        const resetearZonaSeleccionado = usuario => dispatch(zoneDeselectedSet(usuario))

        //modificado para lista
        const userListSet = lista => dispatch(updateUserListSet(lista))

    //Si se crea un usuario nuevo usuarioSeleccinado es null entonces se carga con un usuario vacío
    if(zonaSeleccionado.nuevo ===true){
        zonaSeleccionado = {
            "letter": "",
            "vehicleTypeId": null,
            "width": 1.0,
            "length": 1.0,
            "carsQuantity": 1,
            nuevo: true
        }
    }

    const [zona, setZone] = useState(zonaSeleccionado);
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
        console.log(res)
        setTypeList(res)
    }
    const getZones = async e =>{
        const res = await getZoneList()
        setSoneList(res)
    }
    

    const emptyUser = {
        "letter": "",
        "vehicleTypeId": null,
        "width": 1.0,
        "length": 1.0,
        "carsQuantity": 1,
        nuevo: true
    }

    useEffect(() => {
        getTypeList()
        getZones()
        if(zonaSeleccionado != null && zonaSeleccionado.editar === true){
            setZone(zonaSeleccionado)
            onClick('displayResponsive')
        }else{
            setZone(emptyUser)
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
        resetearZonaSeleccionado()
        dialogFuncMap[`${name}`](false);
    }

    const checkRequired = (zona)=>{
        setSubmitted(true);
        

        console.log('zona',zona)
        if(zona.vehicleTypeId === {} || zona.vehicleTypeId === -1 || zona.vehicleTypeId === null) return true
        if(zona.letter === ''){return true}
        if(zona.carsQuantity < 1){return true}
        //if(zona.ownerDni === 0 || !Number.isInteger(zona.ownerDni) ){return true}
        console.log('zona 2',zona)

        
        return false
    }

    const onUpdate = async (name) => {
        if(checkRequired(zona))return

        let index = listaUsuarios.findIndex(u => u.id === zona.id)

        if (listaUsuarios[index] != zona){
        
            let respuestaActualizacion = await updateZone(zona)

            if(respuestaActualizacion.status != undefined){
                console.log(respuestaActualizacion.data)
                toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaActualizacion.data}`, life: time });
                return
            }
            
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Zona Modificada', life: time })
            

            listaUsuarios[index] = zona
            userListSet(listaUsuarios)
            setTimeout(()=>{onHide('displayResponsive')}, time)
        }else{
            resetearZonaSeleccionado()
        }

        dialogFuncMap[`${name}`](false)
    }

    const onSave = async (name) => {   
        if(checkRequired(zona))return
        console.log("onSave - zona",zona)
        let respuestaCreacion = await createZone(zona)
        console.log("onSave",respuestaCreacion)

        if(respuestaCreacion.status != null && respuestaCreacion.status != 200){ 
            toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaCreacion.data}`, life: time });
            return
        }else{
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Zona Agregado', life: time });
        }


        setTimeout(()=>{onHide('displayResponsive')}, time)
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = {...zona};
        _user[`${name}`] = val;
        setZone(_user);
    }
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _user = {...zona};
        _user[`${name}`] = val;
        setZone(_user);
    }
    const onInputFloatChange = (e, name) => {
        const val = e.target.value ;
        let _user = {...zona};
        _user[`${name}`] = val;
        setZone(_user);
    }

    const onSelectTypeChange = async (e,name) =>{     
        console.log('e',JSON.parse(e.target.value))   
        console.log('name',name)   
        if(e.target.value === -1) return
        const type = JSON.parse(e.target.value)        
        const val = type.id;
        console.log('onSelectTypeChange',val)
        let _garage = {...zona};
        _garage[`${name}`] = val;
        setZone(_garage);
    }

    const onSelectZoneChange = async (e,name) =>{        
        if(e.target.value === -1 || e.target.value === null) return
        const type = JSON.parse(e.target.value)        
        const val = type.id;
        let _garage = {...zona};
        _garage[`${name}`] = val;
        setZone(_garage);
    }

    const onSwitchMantenimientoChange = async (e,name) =>{
        console.log('onSwitchMantenimientoChange',e.target)
        const val = (e.target.value)?1:0
        let _garage = {...zona};
        _garage[`${name}`] = val;
        
        setMantenimiento(e.target.value);
        setZone(_garage);
    }

    const renderFooter = (name) => {
        console.log(zonaSeleccionado)
        return (

            <div>
                {(zonaSeleccionado.nuevo === true)?<Button label="Guardar" icon="pi pi-save" onClick={() => onSave(name)} autoFocus />:null}
                {(zonaSeleccionado.editar === true)?<Button label="Actualizar" icon="pi pi-save" onClick={() => onUpdate(name)} autoFocus />:null}
            </div>
        );
    }

    return (
        <div>
        <Toast ref={toast} />
        <div className="dialog-demo">            
            <div className="card">
                

                <Dialog header="Zona" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooter('displayResponsive')}>
                    
                    
                    <div className="p-field">
                        <h5>Letra</h5>                   
                            <InputText id="letter" value={zona.letter} keyfilter="alpha" onChange={(e) => onInputFloatChange(e, 'letter')} autoFocus className={classNames({ 'p-invalid': submitted && !zona.letter })}/>
                            {submitted && zona.letter === '' && <small className="p-error">La letra es necesaria.</small>}
                    </div>                      
                   
                    <div className="field col">
                        <h5>Cantidad de autos</h5>
                        <InputNumber id="carsQuantity" value={zona.carsQuantity} onValueChange={(e) => onInputNumberChange(e, 'carsQuantity')} mode="decimal" />
                        {submitted && zona.carsQuantity < 0 && <small className="p-error">La cantidad de vehiculos mínima es 1.</small>}   
                    </div>
                    
                    <div className="p-field">
                        <h5>Ancho</h5>                   
                            <InputText id="width" value={zona.width} keyfilter="num" onChange={(e) => onInputFloatChange(e, 'width')} required autoFocus className={classNames({ 'p-invalid': submitted && !zona.width })} />
                            {submitted && zona.width <= 1  && <small className="p-error">El campo es necesario.</small>}   
                    </div>       
                    <div className="p-field">
                        <h5>Largo</h5>                   
                            <InputText id="length" value={zona.length} keyfilter="num" onChange={(e) => onInputFloatChange(e, 'length')} required autoFocus className={classNames({ 'p-invalid': submitted && !zona.length })} />
                            {submitted && zona.length <= 1  && <small className="p-error">El campo es necesario.</small>}   
                    </div>  

                    <div className="p-field">
                        <h5>Tipos de vehiculos</h5>
                        <select  class="form-select " aria-label=".form-select-sm example" onChange={(e) => onSelectTypeChange(e, 'vehicleTypeId')} required >                                                       
                            <option defaultValue value={JSON.stringify({id:-1})} >Seleccione el tipo de vehiculo</option>
                            {typeList.map(type => 
                                <option value= {JSON.stringify(type)} >{type.description}</option>
                            )}
                        </select>
                        {submitted && zona.vehicleTypeId === null && <small className="p-error">Tipo de vehiculo debe ser seleccionado.</small>}
                    </div>

                </Dialog>   
            </div>
        </div>
        </div>
    )
}

export default ZoneDialog