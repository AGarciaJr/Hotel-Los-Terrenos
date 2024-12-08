import React from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../services/serviceAPI";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const reservationId = localStorage.getItem("id");  //assuming the reservation ID is stored in localStorage

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

                    {role === "ADMIN" && (
                        <button onClick={() => navigate("/admin")}>Admin Dashboard</button>
                    )}

                    <button onClick={() => navigate("/profile")}>Profile</button>

                    {role === "GUEST" && reservationId && (
                        <button onClick={() => navigate(`/cancel-reservation/${reservationId}`)}>
                            Cancel Reservation
                        </button>
                    )}

                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
