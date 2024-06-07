import React from 'react';

const ContactCard = ({ contact, onDelete, onEdit }) => {
    const handleDeleteClick = () => {
        console.log(`Deleting contact with id: ${contact.id}`); // Debug log
        onDelete(contact.id);
    };

    const handleEditClick = () => {
        onEdit(contact);
    };

    return (
        <div>
            <h2>{contact.full_name}</h2>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.address}</p>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    );
};

export default ContactCard;