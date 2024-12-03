import React from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../services/serviceAPI";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        serviceAPI.logout(); // Clear token and role
        navigate("/"); // Redirect to the landing page
    };

    return (
        <nav className="navbar">
            <button onClick={() => navigate("/")}>Home</button>
            {!isLoggedIn ? (
                <>
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button onClick={() => navigate("/register")}>Register</button>
                </>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </nav>
    );
};

export default Navbar;
