
// src/components/Home.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {AUTHORIZATION_URL}  from "../constants";

const Home = () => {
    const location = useLocation();
    const error = location.state?.error;

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
                to={AUTHORIZATION_URL}
                className="authorize-button"
            >
                Authorize
            </Link>
            </div>
        </div>
    );
};

export default Home;


