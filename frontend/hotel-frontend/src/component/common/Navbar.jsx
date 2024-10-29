import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import serviceAPI from "../../service/serviceAPI";

function Navbar({ onHomeClick }) {
    const isAuthenticated = serviceAPI.isAuthenticated();
    const isAdmin = serviceAPI.isAdmin();
    const isUser = serviceAPI.isUser();

    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm("Logout?");
        if (isLogout) {
            serviceAPI.logout();
            navigate('/home');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home" onClick={onHomeClick}>Hotel Los Terrenos</NavLink>
            </div>
            <ul className="navbar-ul">
                {/* Scroll to home section when clicking Home */}
                <li><NavLink to="/home" onClick={onHomeClick} activeClass="active">Home</NavLink></li>
                <li><NavLink to="/rooms" activeClass="active">Rooms</NavLink></li>
                <li><NavLink to="/find-booking" activeClass="active">Find My Bookings</NavLink></li>

                { isUser && <li><NavLink to="/profile" activeClass="active">Profile</NavLink></li> }
                { isAdmin && <li><NavLink to="/admin" activeClass="active">Admin</NavLink></li> }

                {!isAuthenticated && <li><NavLink to="/login" activeClass="active">Login</NavLink></li>}
                {!isAuthenticated && <li><NavLink to="/register" activeClass="active">Register</NavLink></li>}

                {isAuthenticated && <li onClick={handleLogout}>Logout</li>}
            </ul>
        </nav>
    );
}

export default Navbar;
