import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// Configuration
const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/thomasisa1';
const APIURL = `${API_BASE_URL}/contacts`;

// API function to update a contact
const updateContact = async (id, contact) => {
    try {
        const response = await fetch(`${APIURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating contact:", error);
        throw error;
    }
};

const EditContact = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const [contact, setContact] = useState(location.state.contact || { full_name: '', email: '', phone: '', address: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contact.full_name || !contact.email || !contact.phone || !contact.address) {
            setError('All fields are required.');
            return;
        }
        try {
            await updateContact(id, contact);
            navigate('/');
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Edit Contact</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="full_name" value={contact.full_name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={contact.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone</label>
                    <input type="tel" name="phone" value={contact.phone} onChange={handleChange} required />
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" name="address" value={contact.address} onChange={handleChange} required />
                </div>
                <button type="submit">Update Contact</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default EditContact;