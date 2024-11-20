import React, { useEffect, useState } from 'react';
import { getEmails } from '../services/EmailService';

const EmailListComponent = () => {
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = 'yourValidToken';
    const systemId = 'yourValidSystemId';

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await getEmails(token, systemId);
                setEmails(response.data);
            } catch (error) {
                console.error('Error fetching emails:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, [token, systemId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Email List</h1>
            <ul>
                {emails.map((email) => (
                    <li key={email.emailId}>
                        <p>Email ID: {email.emailId}</p>
                        <p>From: {email.from}</p>
                        <p>To: {email.to.join(', ')}</p>
                        <p>Subject: {email.subject}</p>
                        <p>Received At: {email.receivedAt}</p>
                        <p>Has Attachments: {email.hasAttachments ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmailListComponent;