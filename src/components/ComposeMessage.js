import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ComposeMessage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const systemId = 'my-system-id';

    const toList = to.split(',').map(item => item.trim());

    const emailData = {
      token,
      systemId,
      from,
      to: toList,
      subject,
      body,
      attachments: attachments.map(file => ({
        filename: file.name,
        url: URL.createObjectURL(file),
      })),
    };

    try {
      const response = await fetch('https://api.yimeil.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(emailData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Correo enviado exitosamente');
        setError('');
      } else {
        setMessage('');
        setError(result.message || 'Error al enviar el correo');
      }
    } catch (error) {
      setMessage('');
      setError('Error de red');
    }
  };

  const handleBackToInbox = () => {
    navigate('/inbox');
  };

  return (
    <div className="compose-message">
      {/* Botón para regresar a la bandeja de entrada */}
      <button
        onClick={handleBackToInbox}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '5px 15px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          width: 'auto',
        }}
      >
        Regresar
      </button>

      <div className="message-form-container">
        <h1>Redactar Mensaje</h1>
        <form onSubmit={handleSendMessage}>
          <label>
            De:
            <input
              type="email"
              placeholder="Tu correo"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Para:
            <input
              type="email"
              placeholder="Destinatarios"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Asunto:
            <input
              type="text"
              placeholder="Asunto del correo"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </label>
          <br />
          <label>
            Cuerpo del mensaje:
            <textarea
              placeholder="Escribe tu mensaje..."
              rows="8"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </label>
          <br />
          <label>
            Adjuntar Archivos:
            <input
              type="file"
              onChange={(e) => setAttachments([...attachments, ...e.target.files])}
              multiple
            />
          </label>
          <br />
          <button type="submit">Enviar</button>
        </form>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default ComposeMessage;
