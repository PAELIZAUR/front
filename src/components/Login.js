import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí haces la autenticación con la API
    if (username === 'testuser' && password === 'password123') {
      const token = 'your_token_here';  // Simula obtener un token
      onLogin(token); // Pasa el token a App
      navigate('/inbox'); // Redirige a la bandeja de entrada
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Hace que ocupe toda la altura de la pantalla
        textAlign: 'center',
        backgroundColor: '#f4f4f9', // Fondo sutil para la página
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para darle un efecto elevado
          backgroundColor: '#fff',
          width: '300px', // Ajusta el tamaño del formulario
          marginTop: '-400px', // Esto mueve el formulario un poco más arriba
        }}
      >
        <h1>Inicio de Sesión</h1>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            marginBottom: '15px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            marginBottom: '20px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Ingresar
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
