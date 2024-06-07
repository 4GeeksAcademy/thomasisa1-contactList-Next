import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Configuration
const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/thomasisa1';
const APIURL = `${API_BASE_URL}/contacts`;

// API function to add a new contact
const addContact = async (contact) => {
    try {
        const response = await fetch(APIURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Server validation error:", errorData);
            throw new Error(`Network response was not ok: ${JSON.stringify(errorData)}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding contact:", error);
        throw error;
    }
};

const AddContact = () => {
    const [contact, setContact] = useState({ name: '', email: '', phone: '', address: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contact.name || !contact.email || !contact.phone || !contact.address) {
            setError('All fields are required.');
            return;
        }
        try {
            await addContact(contact);
            navigate('/');
        } catch (error) {
            setError(`Failed to add contact. ${error.message}`);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Add Contact</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={contact.name} onChange={handleChange} required />
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
                <button type="submit">Add Contact</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default AddContact;