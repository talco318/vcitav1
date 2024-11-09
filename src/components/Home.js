import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const client_uri = 'https://vcita-playground.web.app/oauth&redirect_uri=https://a6ae-85-250-29-181.ngrok-free.app';

const Home = ({ clientId }) => {
    console.log('Client ID:', clientId);

    return (
        <div className="home-container">
            <h1>Hello, you have to authorize first</h1>
            <Link
                to={`https://app.vcita.com/app/oauth/authorize?client_id=${clientId}&redirect_uri=${client_uri}`}
                className="authorize-button"
            >
                Authorize
            </Link>
        </div>
    );
};

export default Home;