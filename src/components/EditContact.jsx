import React, { useState, useEffect } from 'react';
import { updateContact } from '../api';
import { useHistory, useLocation } from 'react-router-dom';

const EditContact = () => {
    const history = useHistory();
    const location = useLocation();
    const { contact } = location.state || {};

    const [updatedContact, setUpdatedContact] = useState(contact || {
        full_name: '',
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
        await updateContact(contact.id, updatedContact);
        history.push('/');
    };

    return (
        <div>
            <h1>Edit Contact</h1>
            <form onSubmit={handleSubmit}>
                <input name="full_name" value={updatedContact.full_name} placeholder="Full Name" onChange={handleChange} />
                <input name="email" value={updatedContact.email} placeholder="Email" onChange={handleChange} />
                <input name="phone" value={updatedContact.phone} placeholder="Phone" onChange={handleChange} />
                <input name="address" value={updatedContact.address} placeholder="Address" onChange={handleChange} />
                <button type="submit">Update Contact</button>
            </form>
        </div>
    );
};

export default EditContact;
