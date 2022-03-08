import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import{
    vehicleSelectedSet
}from '../actions/vehiculoSeleccionadoActions'

import {getVehicleList} from '../service/vehicleService'


const UsersList = ({}) => {

    const actualUser = JSON.parse(localStorage.getItem("usuarioActual"))
    const [carList, carSet] = useState([])

    const submitCarList = async e =>{
        const carList = await getVehicleList()
        //console.log(carList)
        carSet(carList)
    }
    

    useEffect(() => {
        async function fetchData() {
            // You can await here
            await submitCarList();
            // ...
            }
            fetchData();
    }, []); // Or [] if effect doesn't need props or state

    //utilizar use Dispacthc y te crea una funcion
    const dispatch = useDispatch();

    //const [seleccionUser, seleccionUserSet] = useState([])//Sin redux
    const seleccionarVehiculo = vehiculoSeleccionado => dispatch(vehicleSelectedSet(vehiculoSeleccionado))

    const selectVehicle = e =>{
        console.log(e.target.value)
        seleccionarVehiculo(JSON.parse(e.target.value))//Con redux
    }

    return ( 
        
        
        <div> 
            {(carList.length > 0 )?
            <table class="table table-striped">
                <thead key="id">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Matricula</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Tipo</th>
                        {(actualUser.role === 'ROLE_ADMIN')?<th scope="col">
                            Accioness
                            </th>:null}
                    </tr>
                </thead>
                <tbody>
                            
                    {carList.map( vehicle =>              
                    <tr>
                        <th scope="row">{vehicle.id}</th>
                        <td>{vehicle.plate}</td>
                        <td>{vehicle.name}</td>
                        <td>{vehicle.vehicleType.name}</td>
                        {(actualUser.role.name === 'ROLE_ADMIN')?<th>
                            <button type="button" class="btn btn-success" value={JSON.stringify(vehicle)} onClick= {selectVehicle}>Seleccionar</button>
                            </th>:null}
                        {(actualUser.role.name === 'ROLE_ADMIN')?<th>
                            <button type="button" class="btn btn-primary">Modificar</button>
                            </th>:null}
                        {(actualUser.role.name === 'ROLE_ADMIN')?<th>
                            <button type="button" class="btn btn-danger">Eliminar</button>
                            </th>:null}
                        
                        
                    </tr>
                    )}
                </tbody>
            </table>
            : null }

        </div>
     );
}
 
export default UsersList;