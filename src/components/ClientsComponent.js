// src/components/ClientsComponent.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClients } from '../apiClient';

const ClientsComponent = () => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getClients = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                navigate('/');
                return;
            }

            try {
                const data = await fetchClients(accessToken);
                setClients(data.clients || []);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        getClients();
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="text-blue-500 mt-4 font-semibold">Loading Clients...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                    <p>Error: {error}</p>
                    <button
                        className="text-red-500 font-bold mt-2"
                        onClick={() => setError(null)}
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Clients List</h1>
            {clients.length === 0 ? (
                <p className="text-gray-600 text-center">No clients found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="table-header">Name</th>
                            <th className="table-header">Email</th>
                            <th className="table-header">Phone</th>
                            <th className="table-header">Status</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-gray-50 even:bg-gray-50">
                                <td className="table-cell">{client.name}</td>
                                <td className="table-cell">{client.email}</td>
                                <td className="table-cell">{client.phone}</td>
                                <td className="table-cell">
                                    <span
                                        className={`status-badge ${client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                                    >
                                        {client.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ClientsComponent;
