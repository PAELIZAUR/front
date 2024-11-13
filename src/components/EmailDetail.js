import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EmailDetail() {
  const { emailId } = useParams(); // Obtener el emailId de la URL
  const [email, setEmail] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEmailDetail = async () => {
      const token = localStorage.getItem('token');
      const systemId = 'my-system-id'; // Reemplaza con el ID del sistema

      try {
        const response = await fetch(`https://api.yimeil.com/emails/${emailId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

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

  if (error) return <p>{error}</p>;
  if (!email) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{email.subject}</h1>
      <p>{email.from}</p>
      <p>{email.receivedAt}</p>
      <p>{email.body}</p>
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
