// HelloComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const HelloComponent = () => {
  const [data, setData] = useState(null);  // Para guardar la respuesta
  const [error, setError] = useState(null); // Para manejar los errores

  // Este useEffect hace la petición una vez que el componente se monta
  useEffect(() => {
    axios.get("http://localhost:8080/hello", {
      auth: {
        username: "your-username",  // Reemplaza con tu nombre de usuario
        password: "your-password"   // Reemplaza con tu contraseña
      }
    })
    .then(response => {
      setData(response.data);  // Si la petición es exitosa, guarda la respuesta
    })
    .catch(error => {
      setError(error);  // Si ocurre un error, guarda el error
    });
  }, []); // El array vacío asegura que esto solo se ejecute una vez cuando el componente se monta

  // Si hay un error, muestra el mensaje de error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Si no hay datos aún, muestra "Cargando..."
  if (!data) {
    return <div>Cargando...</div>;
  }

  // Si hay datos, muéstralos
  return (
    <div>
      <h1>Respuesta del servidor:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default HelloComponent;
