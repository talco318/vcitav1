// src/App.js
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import OAuth from './components/OAuth';
import ClientsComponent from './components/ClientsComponent';
import CreateUser from "./components/CreateUser";
import {CLIENT_ID, CLIENT_SECRET} from "./constants";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home clientId={CLIENT_ID} />} />
                <Route path="/createUser" element={<CreateUser/>} />
                <Route path="/oauth" element={<OAuth clientId={CLIENT_ID} clientSecret={CLIENT_SECRET} />} />
                <Route path="/clients" element={<ClientsComponent />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;