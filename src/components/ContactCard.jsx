import React from 'react';

const ContactCard = ({ contact, onDelete, onEdit }) => {
    return (
        <div className="contact-card">
            <h3>{contact.full_name}</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Address: {contact.address}</p>
            <button onClick={() => onEdit(contact)}>Edit</button>
            <button onClick={() => onDelete(contact.id)}>Delete</button>
        </div>
    );
};

export default ContactCard;
