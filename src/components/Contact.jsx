import React, { useState, useEffect } from 'react';
import { getContacts, deleteContact } from '../api';
import ContactCard from './ContactCard';
import { useHistory } from 'react-router-dom';

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const data = await getContacts();
        setContacts(data);
    };

    const handleDelete = async (id) => {
        await deleteContact(id);
        fetchContacts();
    };

    const handleEdit = (contact) => {
        history.push(`/edit/${contact.id}`, { contact });
    };

    return (
        <div>
            <h1>Contact List</h1>
            <button onClick={() => history.push('/add')}>Add Contact</button>
            <div>
                {contacts.map(contact => (
                    <ContactCard
                        key={contact.id}
                        contact={contact}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default Contact;
