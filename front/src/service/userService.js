import clienteAxios from '../config/axios'
import createHeader from '../config/axiosConfigurations'

export const getUserAdminList = async () => {
    const res =  await clienteAxios.get('/user/adminList')
    //console.log("En service")
    //console.log(data)
    return res.data
}
export const getUserPartnerList = async () => {
    const res =  await clienteAxios.get('/user/partnerList')
    //console.log("En service")
    //console.log(data)
    return res.data
} 
export const getUserEmployeeList = async () => {
    const res =  await clienteAxios.get('/user/employeeList')
    //console.log("En service")
    //console.log(res)
    return res.data
} 
export const getUserList = async () => {
    const res =  await clienteAxios.get('/user/userList')
    //console.log("En service")
    //console.log(res)
    return res.data
} 
export const getUserRolesList = async () => {
    const res =  await clienteAxios.get('/user/roleList')
    //console.log("En service")
    //console.log(res)
    return res.data
}

export const updateUser = async (user) =>{
    let  respuesta = {}
    try {
        const res  = await clienteAxios.put(`/user/${user.id}/update`,user,createHeader())
        respuesta = res.data
    } catch (error) {
        respuesta = error.response
    }
    return respuesta
}

export const createUser = async (user) =>{
    let  respuesta = {}
    try {
        const  res  = await clienteAxios.post(`/auth/sign-up`,user,createHeader())
        respuesta = res.data
        //console.log(respuesta)
        return respuesta
    } catch (error) {
        //console.log(error.response.data)
        respuesta = error.response
    }
    return respuesta
}

export const deleteUser2 = async (user) =>{
    const  res  = await clienteAxios.delete(`/user/${user.id}`,createHeader())
    return res.data
}

export const deleteUser = async (user) =>{
    console.log('user',user)
    let  respuesta = {}
    try {
        const  res  = await clienteAxios.delete(`/user/${user.id}`,createHeader())
        respuesta = res.data
        return respuesta

    }catch(error){
        respuesta = error.response
    }

    return respuesta
}