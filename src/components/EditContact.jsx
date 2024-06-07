import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

const EditContact = ({ contact, onClose, fetchContacts }) => {
    const [name, setName] = useState(contact.name || '');
    const [phone, setPhone] = useState(contact.phone || '');
    const [email, setEmail] = useState(contact.email || '');
    const [address, setAddress] = useState(contact.address || '');

    const handleUpdateContact = async (event) => {
        event.preventDefault();
        try {
            await updateContact(contact.id, { name, phone, email, address });
            fetchContacts();
            onClose();
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="side-form">
            <h1>Edit Contact</h1>
            <form onSubmit={handleUpdateContact}>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditContact;