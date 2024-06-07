import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Configuration
const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/thomasisa1';
const APIURL = `${API_BASE_URL}/contacts`;

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
    const { state } = useLocation();
    const { contact } = state || { contact: { id: null, full_name: '', phone: '', email: '' } };

    const [fullName, setFullName] = useState(contact.full_name || '');
    const [phone, setPhone] = useState(contact.phone || '');
    const [email, setEmail] = useState(contact.email || '');

    const handleUpdateContact = async (event) => {
        event.preventDefault();
        try {
            await updateContact(contact.id, { full_name: fullName, phone, email });
            navigate('/');
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="app-container">
            <h1>Edit Contact</h1>
            <form onSubmit={handleUpdateContact}>
                <div>
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <button type="submit" className="submit-button">Save</button>
                    <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditContact;