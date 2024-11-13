import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Inbox() {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Para redirigir al login
  const handleLogout = () => {
    localStorage.removeItem('token');  // Elimina el token del localStorage
    navigate('/login');  // Redirige a la página de login
  };

  useEffect(() => {
    const fetchEmails = async () => {
      const token = localStorage.getItem('token');
      const systemId = 'my-system-id'; // Reemplaza con el ID del sistema

      try {
        const response = await fetch('https://api.yimeil.com/emails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Usamos el token en la cabecera
          },
          body: JSON.stringify({ token, systemId }),
        });

        const result = await response.json();

        if (response.ok) {
          setEmails(result);
        } else {
          setError(result.message || 'Error al obtener los correos');
        }
      } catch (error) {
        setError('Error de red');
      }
    };

    fetchEmails();
  }, []);

  return (
    <div>
      <header className="inbox-header">
        <h1>Bandeja de Entrada</h1>
        {/* Botón de cerrar sesión en la parte superior */}
        <button onClick={handleLogout} style={{ padding: '10px', marginBottom: '10px' }}>Cerrar Sesión</button>
      </header>

      <div className="inbox-message-list">
        {emails.length > 0 ? (
          emails.map((email) => (
            <div key={email.emailId}>
              <h2>{email.subject}</h2>
              <p>{email.from}</p>
              <p>{email.receivedAt}</p>
              <p>{email.hasAttachments ? 'Tiene adjuntos' : 'No tiene adjuntos'}</p>
            </div>
          ))
        ) : (
          <p>No tienes correos</p>
        )}
      </div>

      {/* Botón de enviar mensaje en la parte inferior */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/compose">
          <button>Enviar Mensaje</button>
        </Link>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Inbox;
