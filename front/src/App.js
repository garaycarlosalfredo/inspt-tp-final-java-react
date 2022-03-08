import React from 'react';
import Header from './components/Header';
import Signin from './components/Signin';
import Signup from './components/Signup';
import MainUser from './components/MainUser';

import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';

//Redux 
import {Provider} from 'react-redux'
import store from './store';

function App() {
  
  return(
    <Router>
      <Provider store = {store}>        
      <Header/>
      <Routes>
        <Route exact path="/sign-in" element={<Signin/>}/>     
        <Route exact path="/sign-up" element={<Signup/>}/>       
        <Route exact path="/main" element={<MainUser/>}/>       
      </Routes>

      </Provider>
    </Router>
  );
}

export default App;
