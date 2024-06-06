import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContactCard from './ContactCard';

// Configuration
const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/thomasisa1';
const APIURL = `${API_BASE_URL}/contacts`;

// API functions using fetch
const getContacts = async () => {
    try {
        const response = await fetch(APIURL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
    }
};

const deleteContact = async (id) => {
    try {
        const response = await fetch(`${APIURL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error deleting contact:", error);
        throw error;
    }
};

// Contact component
const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const data = await getContacts();
            setContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteContact(id);
            fetchContacts(); // Refresh the contact list after deletion
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const handleEdit = (contact) => {
        navigate(`/edit/${contact.id}`, { state: { contact } });
    };

    return (
        <div>
            <h1>Contact List</h1>
            <Link to='/add'><button>Add Contact</button></Link>
            <div>
                {Array.isArray(contacts) ? contacts.map(contact => (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                )) : <p>No contacts available.</p>}
            </div>
        </div>
    );
};

export default Contact;