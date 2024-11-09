// src/components/OAuth.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAccessToken } from '../apiClient';

const OAuth = ({ clientId, clientSecret }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOAuth = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    const tokenData = await fetchAccessToken(code, clientId, clientSecret);
                    localStorage.setItem('accessToken', tokenData.access_token);
                    navigate('/clients');
                } catch (error) {
                    console.error('Error during OAuth:', error);
                    navigate('/', { state: { error: 'Authentication failed' } });
                }
            }
        };

        handleOAuth();
    }, [clientId, clientSecret, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-8 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Authenticating...</h2>
                <div className="animate-pulse bg-blue-200 h-2 w-32 rounded"></div>
            </div>
        </div>
    );
};

export default OAuth;