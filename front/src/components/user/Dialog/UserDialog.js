
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
import {userSelectedSet,userDeselectedSet} from '../../../actions/usuarioSeleccionadoActions'
import {updateUserListSet} from '../../../actions/usuarioModificadoActions'

import './DialogDemo.css';


//Services
import {createUser,updateUser, getUserRolesList} from '../../../service/userService'


const UserDialog = () => {

    const time = 2000
    //Setear en Readux

        //Conocer el estado
        let usuarioSeleccionado = useSelector(store=>store.usuarioSeleccionado.userSelected)

        //Obtener lista de usuarios
        const listaUsuarios = useSelector(store=>store.usuarioModificado.userList)

    //Setear en Readux
        //utilizar use Dispacthc y te crea una funcion
        const dispatch = useDispatch();
        
        //manda a llamar el action de usuarioActual
        const resetearUsuarioSeleccionado = usuario => dispatch(userDeselectedSet(usuario))

        //modificado para lista
        const userListSet = lista => dispatch(updateUserListSet(lista))

    //Si se crea un usuario nuevo usuarioSeleccinado es null entonces se carga con un usuario vacío
    if(usuarioSeleccionado.nuevo ===true){
        usuarioSeleccionado = {
            dni: '',
            email:  '',
            firstName:  '',
            lastName:  '',
            phone:  '',
            role: {},
            speciality:  '',
            nuevo : true
        }
    }

    const [user, setUser] = useState(usuarioSeleccionado);
    const [roleList, setRoleList] = useState([]);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const [submitted, setSubmitted] = useState(false);

    
    const toast = useRef(null);

    const getRoleList = async e =>{
        const res = await getUserRolesList()
        setRoleList(res)
    }
    const emptyUser = {
    dni: '',
    email:  '',
    firstName:  '',
    id:  '',
    lastName:  '',
    phone: null,
    roleId:  -1,
    specialty:  '',
    }

    useEffect(() => {
        //setUser(usuarioSeleccionado)
        if(usuarioSeleccionado != null && usuarioSeleccionado.editar === true){
            setUser(usuarioSeleccionado)
            onClick('displayResponsive')
        }else{
            setUser(emptyUser)
            onClick('displayResponsive')

            
            getRoleList()
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
        resetearUsuarioSeleccionado()
        dialogFuncMap[`${name}`](false);
    }

    const checkRequired = (user)=>{
        setSubmitted(true);        
        if(user.roleId === {} || user.roleId === -1 ) return true
        if(user.email === ''){return true}
        if(user.dni === 0 || !Number.isInteger(user.dni) ){return true}
        return false
    }

    const onUpdate = async (name) => {
        if(checkRequired(user))return

        let index = listaUsuarios.findIndex(u => u.id === user.id)

        if (listaUsuarios[index] != user){
        
            let respuestaActualizacion = await updateUser(user)

            if(respuestaActualizacion.status != undefined){
                console.log(respuestaActualizacion.data)
                toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaActualizacion.data}`, life: time });
                return
            }
            
            toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Usuario Modificado', life: time })
            

            listaUsuarios[index] = user
            userListSet(listaUsuarios)
            setTimeout(()=>{resetearUsuarioSeleccionado()}, time)
        }else{
            resetearUsuarioSeleccionado()
        }

        dialogFuncMap[`${name}`](false)
    }

    const onSave = async (name) => {   
        if(checkRequired(user))return
        let respuestaCreacion = await createUser(user)

        if(respuestaCreacion.statusCodeValue != 200){
            console.log(respuestaCreacion)
            toast.current.show({ severity: 'error', summary: 'No se puede realizar la acción', detail: `${respuestaCreacion.body}`, life: time });
            return
        }

        toast.current.show({ severity: 'success', summary: 'Acción exitosa', detail: 'Usuario Agregado', life: time });
        dialogFuncMap[`${name}`](false);
        setTimeout(()=>{resetearUsuarioSeleccionado()}, time)
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = {...user};
        _user[`${name}`] = val;
        setUser(_user);
    }
    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _user = {...user};
        _user[`${name}`] = val;
        setUser(_user);
    }
    const renderFooter = (name) => {
        return (
            <div>
                {(usuarioSeleccionado.editar == true)?<Button label="Actualizar" icon="pi pi-save" onClick={() => onUpdate(name)} autoFocus />:null}
                {(usuarioSeleccionado.nuevo == true)?<Button label="Guardar" icon="pi pi-save" onClick={() => onSave(name)} autoFocus />:null}
            </div>
        );
    }



    const onSelectRoleChange = async (e,name) =>{
        if(e.target.value === -1) return

        const role = JSON.parse(e.target.value)        
        const val = role.id;
        let _user = {...user};
        _user[`${name}`] = val;
        setUser(_user);
    }


    return (
        <div>
        <Toast ref={toast} />
        <div className="dialog-demo">            
            <div className="card">

                <Dialog header="Usuario" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={renderFooter('displayResponsive')}>
                    
                    
                    <div className="p-field">
                        <h5>Nombre</h5>                   
                            <InputText id="firstName" value={user.firstName} onChange={(e) => onInputChange(e, 'firstName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.firstName })} />
                            {submitted && !user.firstName && <small className="p-error">Name is required.</small>}
                        
 
                    </div>
                    <div className="p-field">
                        <h5>Apellido</h5>
                        <InputText id="lastName" value={user.lastName} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.lastName })} />
                        {submitted && !user.lastName && <small className="p-error">Name is required.</small>}
                    </div>
                    <div className="field col">
                        <h5>Dni</h5>
                        <InputNumber id="dni" value={user.dni} onValueChange={(e) => onInputNumberChange(e, 'dni')} mode="decimal" />
                        {submitted && !user.dni && <small className="p-error">Email es necesario y debe deben ser solo numeros.</small>}                   
                    </div>
                    <div className="p-field">
                        <h5>Email (Usuario)</h5>
                        <InputText id="email" value={user.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.email })} />
                        {submitted && !user.email && <small className="p-error">Email es necesario.</small>}
                    </div>
                   
                    {(usuarioSeleccionado.nuevo == true)?
                        <div className="p-field">
                            <h5>Password</h5>
                            <Password id="password" value={user.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.password })} />
                            {submitted && !user.password && <small className="p-error">Password es necesario.</small>}
                        </div>
                    :null}
                    
                    <div className="p-field">
                        <h5>Teléfono</h5>
                        <InputText id="phone" value={user.phone} onChange={(e) => onInputChange(e, 'phone')}  autoFocus/>
                    </div>
                    


                    {(usuarioSeleccionado.nuevo == true)?
                        <div className="p-field">
                            <h5>Rol del usuario</h5>
                            <select  class="form-select " aria-label=".form-select-sm example" onChange={(e) => onSelectRoleChange(e, 'roleId')} required >
                                <option defaultValue value={JSON.stringify({id:-1})}>Seleccione un rol</option>
                                {roleList.map(role => 
                                    <option value= {JSON.stringify(role)} >{role.description}</option>
                                )}
                            </select>
                            {submitted && user.roleId === -1 && <small className="p-error">Rol es necesario.</small>}
                        </div>
                    :null}


                    {(usuarioSeleccionado.role.name === "ROLE_EMPLOYEE" || user.roleId === 3) ?                    
                        <div className="p-field">
                            <h5>Especialidad</h5>
                            <InputText id="specialty" value={user.speciality} onChange={(e) => onInputChange(e, 'speciality')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.speciality })} />
                            {submitted && !user.speciality && <small className="p-error">Especialidad es necesaria.</small>}
                        </div>
                    : null}
                </Dialog>   
            </div>
        </div>
        </div>
    )
}

export default UserDialog