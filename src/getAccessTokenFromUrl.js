import fetchAccessToken from './accessToken';

const getAccessTokenFromUrl = async (clientId, clientSecret) => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
        throw new Error('Authorization code not found in URL');
    }

    try {
        const tokenData = await fetchAccessToken(code, clientId, clientSecret);
        return tokenData.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};

export default getAccessTokenFromUrl;