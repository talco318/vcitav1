import React, { useState, useEffect } from 'react';
import getAccessTokenFromUrl from '../getAccessTokenFromUrl';
import apiClient from '../apiClient';

const ClientsComponent = () => {
    const [clientData, setClientData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const clientId = 'bcbaf8cd30eea62d65a24812529c214b3f32ad29cf0ad1fb9de1680d30ad6aca';
    const clientSecret = 'ffa0326272bb49d447b5b77168b6e3ffc81fc34abbc6fe08f9c0ea0ea2c58c34';

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const accessToken = await getAccessTokenFromUrl(clientId, clientSecret);
                const data = await apiClient.fetchClients(accessToken);
                setClientData(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {/* Render client data here */}
            {clientData && clientData.map(client => (
                <div key={client.id}>{client.name}</div>
            ))}
        </div>
    );
};

export default ClientsComponent;