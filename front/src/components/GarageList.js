import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';

import {getGarageList} from '../service/garageService'
import{garageSelectedSet} from '../actions/garageSeleccionadoActions'


const UsersList = ({}) => {

    const actualUser = JSON.parse(localStorage.getItem("usuarioActual"))
    const [garageList, carSet] = useState([])

    const submitCarList = async e =>{
        const garageList = await getGarageList()
        console.log("En service")
        console.log(garageList)
        carSet(garageList)
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

    const seleccionarGarage = garageSeleccionado => dispatch(garageSelectedSet(garageSeleccionado))
    const selectGarage = e =>{
        console.log("Garage",e.target.value)
        seleccionarGarage(JSON.parse(e.target.value))//Con redux
    }

    return ( 
        
        
        <div> 
            {(garageList.length > 0 )?
            <table class="table table-striped">
                <thead key="id">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Zona</th>
                        <th scope="col">Vehiculo</th>
                        <th scope="col">Mentenimiento</th>
                        {(actualUser.role === 'ROLE_ADMIN')?<th scope="col">
                            Accioness
                            </th>:null}
                    </tr>
                </thead>
                <tbody>
                            
                    {garageList.map( garage =>              
                    <tr>
                        <th scope="row">{garage.id}</th>
                        <td>{garage.zone.letter}</td>
                        {(garage.vehicle != null)?<td>{garage.vehicle.plate}</td>:<td>Sin asignar</td>}
                        {(garage.maintenance)?<td>Si</td>:<td>No</td>}
                        {(actualUser.role.name === 'ROLE_ADMIN')?<th>
                            <button type="button" 
                            class="btn btn-success"                            
                            value={JSON.stringify(garage)} 
                            onClick= {selectGarage}  
                            >Seleccionar</button>
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