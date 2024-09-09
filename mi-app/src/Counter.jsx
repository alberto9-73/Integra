// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

function Counter() {
    // 1. Declarar un estado para el contador
    const [count, setCount] = useState(0);

    // 2. Definir un efecto secundario que se ejecuta después de cada renderizado
    useEffect(() => {
        // Mostrar un mensaje cada vez que el contador cambia
        document.title = `Contador: ${count}`;

        // Función de limpieza (opcional)
        return () => {
            console.log('Limpieza');
        };
    }, [count]); // Dependencia: El efecto se ejecuta solo cuando `count` cambia

    // 3. Función para incrementar el contador
    const increment = () => {
        setCount(count + 1);
    };

    // 4. Función para decrementar el contador
    const decrement = () => {
        setCount(count - 1);
    };

    // Renderizar el componente
    return (
        <div>
            <h1>Contador: {count}</h1>
            <button onClick={increment}>Incrementar</button>
            <button onClick={decrement}>Decrementar</button>
        </div>
    );
}

export default Counter;
