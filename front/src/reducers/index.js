import {combineReducers} from 'redux'
import usuarioActualReducer from './usuarioActualReducer'
import usuarioModificadoReducer from './usuarioModificadoReducer'
import usuarioSeleccionadoReducer from './usuarioSeleccionadoReducer'
import vehiculoSeleccionadoReducer from './vehiculoSeleccionadoReducer'
import zonaSeleccionadoReducer from './zonaSeleccionadoReducer'
import garageSeleccionadoReducer from './garageSeleccionadoReducer'
import stateReducer from './stateReducer'

export default combineReducers({
    usuarioActual : usuarioActualReducer,
    usuarioModificado : usuarioModificadoReducer,
    usuarioSeleccionado : usuarioSeleccionadoReducer,
    vehiculoSeleccionado : vehiculoSeleccionadoReducer,    
    zonaSeleccionado : zonaSeleccionadoReducer,    
    garageSeleccionado : garageSeleccionadoReducer,
    stateActions : stateReducer,
})