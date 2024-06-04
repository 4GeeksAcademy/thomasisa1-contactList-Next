import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

// This component ensures the scroll goes to the top when changing the view,
// otherwise it would remain in the position of the previous view.

const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();
    const prevPathname = useRef(pathname);

    useEffect(() => {
        if (pathname !== prevPathname.current) {
            window.scrollTo(0, 0);
        }
        prevPathname.current = pathname;
    }, [pathname]);

    return children;
};

ScrollToTop.propTypes = {
    children: PropTypes.any
};

export default ScrollToTop;