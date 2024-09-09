// src/App.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login.jsx'; 
import App_index from './App_index.jsx';


function App() {
const [conectado, setConectado]=useState(false);
const acceder=(estado)=>{
   setConectado(estado)
}

    return (
    
        conectado  ? < App_index /> : <Login  acceder={acceder}/>  

      
    );
}

export default App;



