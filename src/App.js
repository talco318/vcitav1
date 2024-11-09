import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ClientsComponent from './components/ClientsComponent';
import Home from './components/Home';
import apiClient from './apiClient';
import fetchAccessToken from './accessToken';

const ClientDataContext = createContext();

function App() {
    const [clientData, setClientData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const clientId = 'bcbaf8cd30eea62d65a24812529c214b3f32ad29cf0ad1fb9de1680d30ad6aca';
    const clientSecret = 'ffa0326272bb49d447b5b77168b6e3ffc81fc34abbc6fe08f9c0ea0ea2c58c34';

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const code = new URLSearchParams(window.location.search).get('code');
                const accessToken = await fetchAccessToken(code, clientId, clientSecret);
                const data = await apiClient.fetchClients(accessToken);
                setClientData(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        if (window.location.search.includes('code')) {
            fetchClients();
        }
    }, []);



    return (
        <ClientDataContext.Provider value={{ clientData, isLoading, error }}>
            <BrowserRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Home clientId={clientId}/>} />
                        <Route path="/getparams" element={<ClientsComponent />} />
                        <Route path="/clients" element={<ClientsComponent />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </ClientDataContext.Provider>
    );
}

export default App;