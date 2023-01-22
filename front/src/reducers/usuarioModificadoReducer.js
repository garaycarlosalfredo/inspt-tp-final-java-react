import {
    USER_UPDATE_USERNAME,
    USER_UPDATE_DNI,
    USER_UPDATE_EMAIL,
    USER_UPDATE_PHONE,
    USER_UPDATE_NAME,
    USER_UPDATE_LASTNAME,
    USER_UPDATE_EROLES,
    USER_UPDATE_USERLIST
} from '../types'

//Cada reducer tiene su propio state

const initialState = {
    userName : '',
    dni:'',
    email:'',
    phone:'',
    name:'',
    lastName:'',
    roles:'',
    userList:[]
}

export default function user(state = initialState, action){
    switch(action.type){
        case USER_UPDATE_USERLIST:
            return{
                ...state,
                userList: action.payload
            }
        case USER_UPDATE_USERNAME:
            return{
                ...state,
                userName: action.payload
            }
        case USER_UPDATE_DNI:
            return{
                ...state,
                dni: action.payload
            }
        case USER_UPDATE_EMAIL:
            return{
                ...state,
                email: action.payload
            }
        case USER_UPDATE_PHONE:
            return{
                ...state,
                phone: action.payload
            }
        case USER_UPDATE_NAME:
            return{
                ...state,
                name: action.payload
            }
        case USER_UPDATE_LASTNAME:
            return{
                ...state,
                lastName: action.payload
            }
        case USER_UPDATE_EROLES:
            return{
                ...state,
                roles: action.payload
            }

        default:
            return state;
        
    }
}