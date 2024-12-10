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
            <div
                className="navbar-logo"
                onClick={() => navigate("/")}
                style={{ cursor: 'pointer' }}  // Add this to show it's clickable
            >
                <img
                    src="/hotel-images/VPALZ-LOGO-COPY-NAVBAR.jpeg"
                    alt="Hotel Los Terrenos"
                    className="logo-image"
                />
            </div>
            <div className="navbar-buttons">
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
                        {role === "ADMIN" && (
                            <button onClick={() => navigate("/admin")}>Admin Dashboard</button>
                        )}
                        <button onClick={() => navigate("/profile")}>Profile</button>
                        <button className="logout-button" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
