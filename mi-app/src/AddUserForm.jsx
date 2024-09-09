/* eslint-disable react/prop-types */
// src/AddUserForm.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';


function AddUserForm({ onAddUser }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [clave, setClave]= useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nombre || !email || !clave) {
            alert("Todos los campos son obligatorios");
            return;
        }

        const newUser = { nombre, email, clave };

        try {
            const response = await fetch('http://localhost/integra/api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error('Error al insertar el usuario');
            }

            const result = await response.json();
            onAddUser(result); // Actualiza la lista de usuarios en el componente principal
            setNombre('');
            setEmail('');
            setClave('');
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            alert('Error al agregar el usuario');
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="my-4">
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" id="nombre" className="form-control"value={nombre}
                    onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="clave" className="form-label">contraseña</label>
                <input
                    type="password"
                    id="clave"
                    className="form-control"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                />
            </div>


            <button type="submit" className="btn btn-primary">Agregar Usuario</button>
        </form>


</>




    );
}

export default AddUserForm;




