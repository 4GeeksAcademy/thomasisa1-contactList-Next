import React from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import Layout from "./pages/Layout";
import Contact from './components/Contact';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
            <Route index element={<Contact />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
        </Route>
    )
);