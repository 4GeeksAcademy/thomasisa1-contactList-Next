import React, { useState, useEffect } from 'react';
import ContactCard from './ContactCard';
import AddContact from './AddContact';
import EditContact from './EditContact';
import Footer from './Footer';

// Configuration
const API_BASE_URL = 'https://playground.4geeks.com/contact';
const AGENDA_URL = `${API_BASE_URL}/agendas`;
const APIURL = `${AGENDA_URL}/thomasisa1/contacts`;

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

const checkAgendaExists = async () => {
    try {
        const response = await fetch(`${AGENDA_URL}/thomasisa1`);
        if (response.ok) {
            return true; // Agenda exists
        } else if (response.status === 404) {
            return false; // Agenda does not exist
        } else {
            throw new Error('Error checking agenda existence');
        }
    } catch (error) {
        console.error("Error checking agenda existence:", error);
        throw error;
    }
};

const createAgenda = async () => {
    try {
        const response = await fetch(`${AGENDA_URL}/thomasisa1`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "agenda_name": "thomasisa1"
            })
        });
        if (!response.ok) {
            throw new Error('Failed to create agenda');
        }
        console.log("Agenda created successfully");
    } catch (error) {
        console.error("Error creating agenda:", error);
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
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkAndFetchContacts();
    }, []);

    const checkAndFetchContacts = async () => {
        try {
            const agendaExists = await checkAgendaExists();
            if (!agendaExists) {
                await createAgenda();
            }
            const data = await getContacts();
            setContacts(data);
        } catch (error) {
            setError("Unable to fetch contacts. Please check if the user account exists.");
        }
    };

    const handleDelete = async (id) => {
        console.log(`handleDelete called with id: ${id}`); // Debug log
        try {
            await deleteContact(id);
            checkAndFetchContacts(); // Refresh the contact list after deletion
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const handleEdit = (contact) => {
        setSelectedContact(contact);
        setShowEditForm(true);
    };

    // Pagination
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="app-container">
            <h1>Contact List</h1>
            {error && <div className="error">{error}</div>}
            <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>Add Contact</button>
            <table className="table table-striped contact-table">
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
                    <button key={index + 1} onClick={() => paginate(index + 1)} className="btn btn-primary">
                        {index + 1}
                    </button>
                ))}
            </div>
            {showAddForm && <AddContact onClose={() => setShowAddForm(false)} contacts={contacts} fetchContacts={checkAndFetchContacts} />}
            {showEditForm && selectedContact && (
                <EditContact
                    contact={selectedContact}
                    onClose={() => setShowEditForm(false)}
                    fetchContacts={checkAndFetchContacts}
                />
            )}
        </div>
    );
};

export default Contact;