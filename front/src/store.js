import {applyMiddleware, compose, createStore} from 'redux'
import thunk  from 'redux-thunk'
import reducer from './reducers'

const store = createStore(
    reducer,
    compose( applyMiddleware(thunk),
    typeof window === 'object' &&                                       //Esto es porque si no estamos en un navegador con Redux devTools va a romper
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?    //Esto es porque si no estamos en un navegador con Redux devTools va a romper
            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f              //Esto es porque si no estamos en un navegador con Redux devTools va a romper
    )
)

export default store