import React from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../services/serviceAPI";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {
        serviceAPI.logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            <button onClick={() => navigate("/")}>Home</button>
            {!isLoggedIn ? (
                <>
                    <button onClick={() => navigate("/find-reservation")}>Find Reservation</button>
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button onClick={() => navigate("/register")}>Register</button>
                </>
            ) : (
                <>
                    {role === "CLERK" && (
                        <button onClick={() => navigate("/clerk")}>Clerk Dashboard</button>
                    )}

                    <button onClick={() => navigate("/profile")}>Profile</button>

                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
