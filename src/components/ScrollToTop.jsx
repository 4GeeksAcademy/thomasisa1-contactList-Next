// ScrollToTop.jsx
import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return <div className="scroll-to-top">{children}</div>;
};

export default ScrollToTop;