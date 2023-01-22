import clienteAxios from '../config/axios'
import createHeader from '../config/axiosConfigurations'

export const getGarageList = async () => {
    const res =  await clienteAxios.get('/garages/list',createHeader())
    //console.log("En service Garage")
    //console.log(res.data)
    return res.data
}
export const deleteGarage = async (garage) =>{
    console.log('deleteGarage',garage)
    let  respuesta = {}
    try {
        const  res  = await clienteAxios.delete(`/garages/garage/${garage.id}`,createHeader())
        respuesta = res.data
        return respuesta

    }catch(error){
        respuesta = error.response
    }

    return respuesta
}
export const getGarageListByOwner = async (asign) =>{
    
    let  respuesta = {}
    try {
        console.log('getGarageListByOwner - asign',asign)
        const  res  = await clienteAxios.get(`/garages/list/${asign.dni}`,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response)
        respuesta = error.response
    }
    return respuesta
}

export const asignZoneGarage = async (asign) =>{
    let  respuesta = {}
    try {
        console.log(asign)
        const  res  = await clienteAxios.put(`/garages/asignZone`,asign,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    console.log('respuesta',respuesta)
    return respuesta
}

export const unAsignZoneGarage = async (asign) =>{
    let  respuesta = {}
    try {
        console.log(asign)
        const  res  = await clienteAxios.put(`/garages/unasignZone`,asign,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    console.log('respuesta',respuesta)
    return respuesta
}

export const createGarage = async (garage) =>{
    console.log('garage en service',garage)
    let  respuesta = {}
    try {
        const  res  = await clienteAxios.post(`/garages/garage`,garage,createHeader())
        respuesta = res.data
        //console.log(respuesta)
        return respuesta
    } catch (error) {
        //console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}
export const updateGarage = async (garage) =>{
    console.log('garage en service updateGarage',garage)
    let  respuesta = {}
    try {
        const  res  = await clienteAxios.put(`/garages/garage/${garage.id}`,garage,createHeader())
        respuesta = res.data
        //console.log(respuesta)
        return respuesta
    } catch (error) {
        //console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}
export const asignVehicleGarage = async (asign) =>{
    let  respuesta = {}
    try {
        console.log(asign)
        const  res  = await clienteAxios.put(`/garages/asignVehicle`,asign,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}

export const unasignVehicleGarage = async (asign) =>{
    let  respuesta = {}
    try {
        console.log(asign)
        const  res  = await clienteAxios.put(`/garages/unasignVehicle`,asign,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}

export const asignGaragePartner = async (asign) =>{
    let  respuesta = {}
    try {
        console.log(asign)
        const  res  = await clienteAxios.put(`/garages/asignOwner/${asign.id}`,asign,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }

    console.log(respuesta)
    return respuesta
}

export const unasignGaragePartner = async (asign) =>{
    let  respuesta = {}
    console.log(asign)
    try {
        const  res  = await clienteAxios.put(`/garages/unasignOwner/${asign.id}`,createHeader())
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