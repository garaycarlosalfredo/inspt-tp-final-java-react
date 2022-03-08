import clienteAxios from '../config/axios'
import createHeader from '../config/axiosConfigurations'


export const createVehicle = async (vehicle) =>{
    let  respuesta = {}
    try {
        const  res  = await clienteAxios.post(`/vehicle/car`,vehicle,createHeader())
        respuesta = res.data
        //console.log(respuesta)
        return respuesta
    } catch (error) {
        //console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}

export const deleteVehicle = async (vehicle) =>{
    console.log('deleteVehicle',vehicle)
    let  respuesta = {}
    try {
        const  res  = await clienteAxios.delete(`/vehicle/car/${vehicle.id}`,createHeader())
        respuesta = res.data
        return respuesta

    }catch(error){
        respuesta = error.response
    }

    return respuesta
}

export const updateVehicle = async (asign) =>{
    let  respuesta = {}
    try {
        console.log(asign)
        const  res  = await clienteAxios.put(`/vehicle/car/${asign.id}`,asign,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}

export const getTypeVehicleList = async () => {
    const res =  await clienteAxios.get('/vehicle/type-list',createHeader())
    //console.log("En service")
    //console.log(res.data)
    return res.data
}

export const getVehicleList = async () => {
    const res =  await clienteAxios.get('/vehicle/list',createHeader())
    //console.log("En service")
    //console.log(res.data)
    return res.data
}
export const getVehicleListByOwner = async (user) => {

    let  respuesta = {}
    try {
        console.log('getVehicleListByOwner - user', user)
        const res =  await clienteAxios.get(`/vehicle/ownerVehicles/${user.dni}`,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}
export const asignVehiclePartner = async (asign) =>{
    let  respuesta = {}
    try {
        console.log(asign)
        const  res  = await clienteAxios.put(`/vehicle/car/${asign.id}`,asign,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}

export const unasignVehiclePartner = async (asign) =>{
    let  respuesta = {}
    console.log(asign)
    try {
        const  res  = await clienteAxios.put(`/vehicle/car/${asign.id}`,asign,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}
//const  {data}  = await clienteAxios.post('http://localhost:8080/auth/sign-in',usuarioLogin)