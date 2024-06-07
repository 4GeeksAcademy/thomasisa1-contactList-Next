import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContactCard from './ContactCard';
import Footer from './Footer';

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
        const data = await response.json();
        console.log("Fetched contacts:", data); // Log fetched data
        return data.contacts; // Return the contacts array
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
        return {};
    } catch (error) {
        console.error("Error deleting contact:", error);
        throw error;
    }
};

// Contact component
const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [contactsPerPage] = useState(10);
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
        console.log(`handleDelete called with id: ${id}`); // Debug log
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

    // Pagination
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="app-container">
            <h1>Contact List</h1>
            <Link to='/add'><button>Add Contact</button></Link>
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentContacts.length === 0 ? (
                        <tr>
                            <td colSpan="4">No contacts available.</td>
                        </tr>
                    ) : (
                        currentContacts.map(contact => (
                            <ContactCard
                                key={contact.id}
                                contact={contact}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                            />
                        ))
                    )}
                </tbody>
            </table>
            <Footer isContactListEmpty={contacts.length === 0} />
            <div className="pagination">
                {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Contact;