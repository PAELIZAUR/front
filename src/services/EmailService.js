import axios from 'axios';

// Configuración de Axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para obtener la lista de correos
export const getEmails = (token, systemId) => {
    return apiClient.get('/emails', {
        headers: {
            'token': token,
            'systemId': systemId,
        },
    });
};

// Función para obtener los detalles de un correo específico
export const getEmailDetails = (emailId, token, systemId) => {
    return apiClient.get(`/emails/${emailId}`, {
        headers: {
            'token': token,
            'systemId': systemId,
        },
    });
};


// Función para enviar un nuevo correo
export const sendEmail = (emailData, token, systemId) => {
    return apiClient.post('/emails', emailData, {
        headers: {
            'token': token,
            'systemId': systemId,
        },
    });
};