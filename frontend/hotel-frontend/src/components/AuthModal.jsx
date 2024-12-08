import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthModal.css";

const AuthModal = ({ onClose }) => {
    const navigate = useNavigate();

    return (
        <div className="auth-modal">
            <div className="modal-content">
                <h2>Please Login or Register to Reserve a Room</h2>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default AuthModal;
