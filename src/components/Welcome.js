import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh', // Cambia de 100vh a 80vh para subir el contenido
        textAlign: 'center',
      }}
    >
      <h1>Bienvenidos a Yimeil</h1>
      <p>Para continuar, por favor inicia sesión.</p>
      <button
        onClick={handleLoginClick}
        style={{
          marginTop: '20px', // Agrega espacio entre el texto y el botón
          padding: '10px 20px', // Tamaño del botón para una mejor apariencia
          fontSize: '16px',
        }}
      >
        Iniciar Sesión
      </button>
    </div>
  );
}

export default Welcome;
