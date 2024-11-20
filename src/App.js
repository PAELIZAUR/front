import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Inbox from './components/Inbox';
import ComposeMessage from './components/ComposeMessage';
import EmailDetail from './components/EmailDetail'; // Importar el nuevo componente EmailDetail

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);  // Guardamos el token

  // Comprobamos si ya tenemos un token guardado en el localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token'); // Aquí verificamos el token en localStorage
    if (savedToken) {
      setIsLoggedIn(true);
      setToken(savedToken);
    }
  }, []);  // Solo ejecutamos al montar el componente

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setToken(token);  // Almacenamos el token
    localStorage.setItem('token', token);  // Guardamos el token en localStorage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem('token');  // Eliminar token del localStorage
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/inbox"
            element={isLoggedIn ? <Inbox token={token} /> : <Navigate to="/login" />}
          />
          <Route
            path="/compose"
            element={isLoggedIn ? <ComposeMessage token={token} /> : <Navigate to="/login" />}
          />
          {/* Nueva ruta para ver los detalles del correo electrónico */}
          <Route
            path="/emails/:emailId"
            element={isLoggedIn ? <EmailDetail token={token} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
