import {TOKEN_URL} from "./constants";

export const fetchAccessToken = async (code, clientId, clientSecret) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: 'https://vcita-playground.web.app/oauth',
            grant_type: 'authorization_code',
            code: code
        })
    };

    const response = await fetch(TOKEN_URL, options);
    if (!response.ok) {
        throw new Error('Failed to fetch access token');
    }
    return response.json();
};

export const fetchClients = async (accessToken) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    const response = await fetch('https://api.vcita.biz/platform/v1/clients', options);
    if (!response.ok) {
        throw new Error('Failed to fetch clients');
    }
    return response.json();
};

export const createUser = async (userData, accessToken) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(userData)
    };

    const response = await fetch('https://api.vcita.biz/platform/v1/clients', options);
    if (!response.ok) {
        throw new Error('Failed to create user');
    }
    return response.json();
};
