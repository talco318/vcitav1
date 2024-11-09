import {REDIRECT_URI, TOKEN_URL} from "./constants";

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
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
            code: code
        })
    };

    try {
        const response = await fetch(TOKEN_URL, options);
        const data = await response.json();
        return data; // This will contain the access token and other details
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
};

export default fetchAccessToken;