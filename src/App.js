// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import OAuth from './components/OAuth';
import ClientsComponent from './components/ClientsComponent';
import CreateUser from "./components/CreateUser";

function App() {
    const clientId = 'bcbaf8cd30eea62d65a24812529c214b3f32ad29cf0ad1fb9de1680d30ad6aca';
    const clientSecret = 'ffa0326272bb49d447b5b77168b6e3ffc81fc34abbc6fe08f9c0ea0ea2c58c34';

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home clientId={clientId} />} />
                <Route path="/createUser" element={<CreateUser/>} />
                <Route path="/oauth" element={<OAuth clientId={clientId} clientSecret={clientSecret} />} />
                <Route path="/clients" element={<ClientsComponent />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;