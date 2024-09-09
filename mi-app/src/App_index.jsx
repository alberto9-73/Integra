// src/App.js
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddUserForm from "./AddUserForm";
import Counter from "./Counter";
import Imag from "./Imag.jsx";

// Asegúrate de que la ruta sea correcta

function App_index() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost/integra/api.php")
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddUser = (newUser) => {
    setUsuarios([...usuarios, newUser]);
  };

  return (
    <>
      <Imag></Imag>

      <div className="container d-flex flex-column align-items-center min-vh-100">
        <header className="my-4 text-center">
          <h1>Usuarios</h1>
        </header>
        <AddUserForm onAddUser={handleAddUser} />
        <div className="w-75">
          <ul className="list-group">
            {usuarios.map((usuario) => (
              <li key={usuario.id} className="list-group-item">
                {usuario.nombre} - {usuario.email}
                -- <button id="" className="btn btn-danger ">Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <center>
        <Counter />
      </center>
    </>
  );
}

export default App_index;
