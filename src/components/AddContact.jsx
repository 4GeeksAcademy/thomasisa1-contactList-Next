import React, { useState } from 'react';
import { addContact } from '../api';
import { useHistory } from 'react-router-dom';

const AddContact = () => {
    const [contact, setContact] = useState({
        full_name: '',
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
        await addContact(contact);
        history.push('/');
    };

    return (
        <div>
            <h1>Add Contact</h1>
            <form onSubmit={handleSubmit}>
                <input name="full_name" placeholder="Full Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <input name="phone" placeholder="Phone" onChange={handleChange} />
                <input name="address" placeholder="Address" onChange={handleChange} />
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default AddContact;
