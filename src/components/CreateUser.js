// src/components/CreateUser.js
import React, { useState } from 'react';
import { fetchAccessToken, createUser } from '../apiClient';
import '../CreateUser.css';
import {CLIENT_ID, CLIENT_SECRET} from "../constants";

const CreateUser = () => {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        custom_field1: '',
        custom_field2: '',
        custom_field3: '',
        address: '',
        source_campaign: '',
        source_channel: '',
        source_name: '',
        source_url: '',
        staff_id: '',
        status: '',
        tags: ''
    });
    const formInputsField = [
        { name: 'first_name', placeholder: 'First Name' },
        { name: 'last_name', placeholder: 'Last Name' },
        { name: 'phone', placeholder: 'Phone' },
        { name: 'custom_field1', placeholder: 'Custom Field 1' },
        { name: 'custom_field2', placeholder: 'Custom Field 2' },
        { name: 'custom_field3', placeholder: 'Custom Field 3' },
        { name: 'address', placeholder: 'Address' },
        { name: 'source_campaign', placeholder: 'Source Campaign' },
        { name: 'source_channel', placeholder: 'Source Channel' },
        { name: 'source_name', placeholder: 'Source Name' },
        { name: 'source_url', placeholder: 'Source URL' },
        { name: 'staff_id', placeholder: 'Staff ID' },
        { name: 'status', placeholder: 'Status' },
        { name: 'tags', placeholder: 'Tags (comma-separated)' },
    ];

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const code = '<CODE>';

            const tokenData = await fetchAccessToken(code, CLIENT_ID, CLIENT_SECRET);
            const accessToken = tokenData.access_token;

            const data = await createUser(userData, accessToken);
            setResponse(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="create-user-container">
            <h2>Create User</h2>
            <form className="create-user-form" onSubmit={handleSubmit}>
                {formInputsField.map((field) => (
                    <input
                        key={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={userData[field.name]}
                        onChange={handleChange}
                        className="form-input"
                    />
                ))}
                <button type="submit" className="submit-button">Create User</button>
            </form>
            {response && (
                <div className="response-container">
                    <h3>Response</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default CreateUser;
