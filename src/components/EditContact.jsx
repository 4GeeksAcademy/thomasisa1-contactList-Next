import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Configuration
const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/thomasisa1';
const APIURL = `${API_BASE_URL}/contacts`;

// API function using fetch
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
    const history = useHistory();
    const location = useLocation();
    const { contact } = location.state || {};

    const [updatedContact, setUpdatedContact] = useState(contact || {
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (!contact) {
            history.push('/');
        }
    }, [contact, history]);

    const handleChange = (e) => {
        setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateContact(contact.id, updatedContact);
            history.push('/');
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    return (
        <div>
            <h1>Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" value={updatedContact.name} placeholder="Name" onChange={handleChange} />
                <input name="email" value={updatedContact.email} placeholder="Email" onChange={handleChange} />
                <input name="phone" value={updatedContact.phone} placeholder="Phone" onChange={handleChange} />
                <input name="address" value={updatedContact.address} placeholder="Address" onChange={handleChange} />
                <button type="submit">Update Contact</button>
            </form>
        </div>
    );
};

export default EditContact;
