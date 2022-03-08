import React , {useState, useEffect}from 'react';
import { useNavigate } from 'react-router-dom';

//Parar ejecutar las acciones y forma de acceder
import {useDispatch, useSelector} from 'react-redux'

//Action de Redux
import { userLoginSet ,userSignoutSet } from '../actions/usuarioActualActions';



const Signin = () => {
    //state del componente
    const[email, userNameSet] = useState('');
    const[password, passwordSet] = useState('');

    //utilizar use Dispacthc y te crea una funcion
    const dispatch = useDispatch();

    //Selector prara acceder al store
    const actualUser = useSelector(   //Levanto la información del store de redux
        state=>state.usuarioActual.info
    )

    let navigate = useNavigate();

    //manda a llamar el action de usuarioActual
    const signinUser = usuarioLogin => dispatch(userLoginSet(usuarioLogin))
    

    //Cuando el usuario haga submit 
    const submitSignin = async e =>{
        e.preventDefault();

        //Validar formulario
        if (email.trim() ==='' || password.trim() ===''){
            return
        }
        //ver si no hay errores     


        //Signin
        signinUser({
            email,
            password
        })
        
        //navigate('/main')
 
    }

/*
    if(actualUser!=null){
        console.log('EN SIGNING',actualUser)
        navigate('/main')
    }
    */
    useEffect(() => {
        if(actualUser!==null){           
            navigate('/main') 
        }else{            
            navigate('/sign-in') 
        }
      },[actualUser]);

    //Cuando el usuario haga submit out

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className ="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Ingreso al sistema
                        </h2>
                        <form
                            onSubmit = {submitSignin}
                        >
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Nombre de usuario</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp"
                                    name = "email"
                                    value={email}
                                    onChange={e=>userNameSet(e.target.value)}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label">Password</label>
                                <input 
                                    type="password" 
                                    class="form-control" 
                                    id="exampleInputPassword1"
                                    name = "password"
                                    value={password}
                                    onChange={e=>passwordSet(e.target.value)}
                                />
                            </div>            
                            <button type="submit" class="btn btn-primary">Ingresar</button>
                            <div id="emailHelp" class="form-text">Si aún no tiene una cuanta, consulte con su administrador</div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default Signin;