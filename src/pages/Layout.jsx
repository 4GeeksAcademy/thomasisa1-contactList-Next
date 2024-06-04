import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </ScrollToTop>
    );
};

export default Layout;