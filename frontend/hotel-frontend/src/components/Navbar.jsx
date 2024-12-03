import React from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../services/serviceAPI";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        serviceAPI.logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/find-reservation")}>Find Reservations</button> {/* New Button */}

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
