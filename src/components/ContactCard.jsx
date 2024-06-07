import React from 'react';

const ContactCard = ({ contact, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{contact.full_name}</td>
            <td>{contact.phone}</td>
            <td>{contact.email}</td>
            <td>
                <button className="edit-button" onClick={() => onEdit(contact)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(contact.id)}>Delete</button>
            </td>
        </tr>
    );
};

export default ContactCard;