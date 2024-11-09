const fetchAccessToken = async (code, clientId, clientSecret) => {
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

    try {
        const response = await fetch('https://api.vcita.biz/oauth/token', options);
        const data = await response.json();
        return data; // This will contain the access token and other details
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error; // Re-throw the error for handling in the main component
    }
};

const fetchClients = async (accessToken) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    };

    try {
        const response = await fetch('https://api.vcita.biz/clients', options);
        const data = await response.json();
        return data; // This will contain the client data
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

// Export both functions as named exports
export { fetchAccessToken, fetchClients };
