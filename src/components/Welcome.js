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
        height: '50vh', // Cambia de 100vh a 80vh para subir el contenido
        textAlign: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '30px 40px',
          width: 'px', // Ancho del recuadro
        }}
      >
        <h1 style={{ fontSize: '24px', color: '#333' }}>Bienvenidos a Yimeil</h1>
        <p style={{ fontSize: '16px', color: '#555' }}>
          Para continuar, por favor inicia sesión.
        </p>
        <button
          onClick={handleLoginClick}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

export default Welcome;
