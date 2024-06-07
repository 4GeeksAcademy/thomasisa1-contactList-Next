import React, { useState } from 'react';

const API_BASE_URL = 'https://playground.4geeks.com/contact/agendas/thomasisa1';
const APIURL = `${API_BASE_URL}/contacts`;

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

const AddContact = ({ onClose, contacts, fetchContacts }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleAddContact = async (event) => {
        event.preventDefault();
        try {
            const existingContact = contacts.find(contact => contact.email === email);
            if (existingContact) {
                alert("User with this email already exists");
                return;
            }

            await addContact({ name, phone, email, address });
            fetchContacts();
            onClose();
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    return (
        <div className="side-form">
            <h1>Add Contact</h1>
            <form onSubmit={handleAddContact}>
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
                    <button type="submit" className="btn btn-primary">Add Contact</button>
                    <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddContact;