
// src/components/Home.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Home = ({ clientId }) => {
    const location = useLocation();
    const error = location.state?.error;
    const redirect_uri = 'https://vcita-playground.web.app/oauth';

    return (
        <div className="home-container">
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Welcome to Client Manager
            </h1>
            <h2>You have to authorize first</h2>
            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}
            <div>
            <Link
                to={`https://app.vcita.com/app/oauth/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=code`}
                className="authorize-button"
            >
                Authorize
            </Link>
            </div>
        </div>
    );
};

export default Home;


