import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Configuration
const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/thomasisa1';
const APIURL = `${API_BASE_URL}/contacts`;

// API functions using fetch
const getContact = async (id) => {
    try {
        const response = await fetch(`${APIURL}/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching contact:", error);
        throw error;
    }
};

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
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchContact();
    }, []);

    const fetchContact = async () => {
        try {
            const data = await getContact(id);
            setContact(data);
        } catch (error) {
            console.error("Error fetching contact:", error);
        }
    };

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateContact(id, contact);
            navigate('/');
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    return (
        <div>
            <h1>Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={contact.name} onChange={handleChange} />
                <input name="email" placeholder="Email" value={contact.email} onChange={handleChange} />
                <input name="phone" placeholder="Phone" value={contact.phone} onChange={handleChange} />
                <input name="address" placeholder="Address" value={contact.address} onChange={handleChange} />
                <button type="submit">Update Contact</button>
            </form>
        </div>
    );
};

export default EditContact;
