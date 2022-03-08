import {
    SIGNIN,
    SIGNOUT,
    SIGNIN_SUCCESS,
    USER_ADMIN,
} from '../types'

//Cada reducer tiene su propio state

const initialState = {
    info : null,
    userUpdate: null,
    error: null,
    loading: false,
    admin: false,
    employee: false,
    partner: false
}

export default function user(state = initialState, action){
    switch(action.type){
        case SIGNIN:
            return{
                ...state,
                loading: action.payload
            }
        case SIGNOUT:
            return{
                ...state,
                info: action.payload
            }
        case SIGNIN_SUCCESS:
            return{
                ...state,
                loading: false,
                info: action.payload
            }
        case USER_ADMIN:
            return{
                ...state,
                admin: action.payload
            }

        default:
            return state;
        
    }
}