import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EmailDetail() {
  const { emailId } = useParams(); // Obtener el emailId de la URL
  const [email, setEmail] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmailDetail = async () => {
      const token = localStorage.getItem('token'); // Obtener el token del localStorage

      // Verifica si el token no está disponible y redirige a login si es necesario
      if (!token) {
        setError('No estás autenticado. Redirigiendo al login...');
        setTimeout(() => window.location.href = '/login', 2000); // Redirigir al login después de un breve mensaje
        return;
      }

      const systemId = 'my-system-id'; // Reemplaza con el ID de tu sistema

      try {
        // Hacer la solicitud GET para obtener el detalle del correo
        const response = await fetch(`https://api.yimeil.com/emails/${emailId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        // Convertir la respuesta a JSON
        const result = await response.json();

        if (response.ok) {
          setEmail(result);
        } else {
          setError(result.message || 'Error al obtener los detalles del correo');
        }
      } catch (error) {
        setError('Error de red');
      }
    };

    fetchEmailDetail();
  }, [emailId]);

  // Mostrar errores si existen
  if (error) return <p>{error}</p>;

  // Mostrar un mensaje mientras los datos del correo están siendo cargados
  if (!email) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{email.subject}</h1>
      <p><strong>De:</strong> {email.from}</p>
      <p><strong>Recibido el:</strong> {email.receivedAt}</p>
      <p><strong>Contenido:</strong></p>
      <div>{email.body}</div>

      {/* Mostrar los adjuntos si existen */}
      {email.attachments && email.attachments.length > 0 && (
        <div>
          <h3>Adjuntos:</h3>
          {email.attachments.map((attachment, index) => (
            <div key={index}>
              <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.filename}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmailDetail;

