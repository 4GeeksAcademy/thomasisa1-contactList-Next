import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Configuration
const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/thomasisa1';
const APIURL = `${API_BASE_URL}/contacts`;

// API function using fetch
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
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding contact:", error);
        throw error;
    }
};

const AddContact = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const history = useHistory();

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addContact(contact);
            history.push('/');
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    return (
        <div>
            <h1>Add Contact</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="phone" placeholder="Phone" onChange={handleChange} />
                <input name="address" placeholder="Address" onChange={handleChange} />
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default AddContact;
