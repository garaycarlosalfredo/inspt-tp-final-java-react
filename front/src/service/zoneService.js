import clienteAxios from '../config/axios'
import createHeader from '../config/axiosConfigurations'

export const getZoneList = async () => {
    const res =  await clienteAxios.get('/zones/list')
    //console.log("En service Zone")
    //console.log(res.data)
    return res.data
}
export const getZoneEmployeeList = async (user) => {
    const res =  await clienteAxios.get(`/employee/assigneZoneEmployee/findZoneOfEmployee/${user.id}`,createHeader())
    //console.log("En service Zone")
    //console.log(res.data)
    return res.data
}

export const createZone = async (asign) =>{
    console.log('createZone', asign)
    let  respuesta = {}
    try {
        console.log('createZone', asign)
        const  res  = await clienteAxios.post(`/zones/zone`,asign,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}

export const deleteZone = async (asign) =>{
    console.log('createZone', asign)
    let  respuesta = {}
    try {
        console.log('createZone', asign)
        const  res  = await clienteAxios.delete(`/zones/zone/${asign.id}`,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}
export const updateZone = async (asign) =>{
    console.log('createZone', asign)
    let  respuesta = {}
    try {
        console.log('createZone', asign)
        const  res  = await clienteAxios.put(`/zones/zoneUpdate`,asign,createHeader())
        respuesta = res.data
        console.log(respuesta)
        return respuesta
    } catch (error) {
        console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}
export const asignZoneToEmployee = async (asign) =>{
    let  respuesta = {}
    try {
        const  res  = await clienteAxios.post(`/employee/assigneZoneEmployee`,asign,createHeader())
        respuesta = res.data
        //console.log(respuesta)
        return respuesta
    } catch (error) {
        //console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}

export const deleteZoneToEmployee = async (asign) =>{
    let  respuesta = {}
    try {

        console.log('deleteZoneToEmployee asign',asign)
        const  zoneToDelete  = await clienteAxios.get(`/employee/assigneZoneEmployee`,{params: asign},createHeader())

        console.log('deleteZoneToEmployee',zoneToDelete)

        const  res  = await clienteAxios.delete(`/employee/assigneZoneEmployee/${zoneToDelete.data.id}`,createHeader())
        //respuesta = res.data
        console.log("Respuesta ok deleter",respuesta)
        //return respuesta
    } catch (error) {
        console.log('Respuesta delete error ',error)
        respuesta = error.response
    }
    return respuesta
}

//const  {data}  = await clienteAxios.post('http://localhost:8080/auth/sign-in',usuarioLogin)