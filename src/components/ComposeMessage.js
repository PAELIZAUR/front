import { useState } from 'react';

function ComposeMessage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    const systemId = 'my-system-id'; // ID del sistema (debes reemplazarlo por el adecuado)

    // Convertir los destinatarios en una lista si hay varios
    const toList = to.split(',').map(item => item.trim());

    const emailData = {
      token,
      systemId,
      from,  // El remitente es el valor del input 'from'
      to: toList,  // Lista de destinatarios
      subject,  // Asunto
      body,  // Cuerpo del mensaje
      attachments: attachments.map(file => ({
        filename: file.name,
        url: URL.createObjectURL(file),  // Si solo estás enviando archivos locales, puedes generar una URL temporal
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

  return (
    <div className="compose-message">
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
            rows="10"
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

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default ComposeMessage;
