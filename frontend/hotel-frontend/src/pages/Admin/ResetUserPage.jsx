import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../../services/serviceAPI";
import "./ResetUserPage.css";


const ResetUserPage = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [guestInfo, setGuestInfo] = useState(null);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Check if the user is an admin
    useEffect(() => {
        (async () => {
            const isAdmin = await serviceAPI.isAdmin();
            if (!isAdmin) {
                navigate("/");
            }
        })();
    }, [navigate]);

    const handleSearch = async () => {
        setError("");
        setGuestInfo(null);

        try {
            const response = await serviceAPI.getUserByPhoneNumber(phoneNumber);
            if (response && response.user) {
                setGuestInfo(response.user);
                setEmail(response.user.email || "");
                setPassword("");
            } else {
                setError("No user found with that phone number.");
            }

        } catch (err) {
            console.error("Error fetching guest by phone:", err);
            console.error("Error details:", err.response || err.message);
            setError("Could not find user. Please check the phone number and try again.");
        }
    };

    const handleUpdate = async () => {
        if (!guestInfo || !guestInfo.id) return;

        try {
            const updateResponse = await serviceAPI.updateUserById(guestInfo.id, { email, password });
            if (updateResponse && updateResponse.statusCode === 200) {
                alert("User credentials updated successfully!");
            } else {
                setError("Failed to update user credentials.");
            }
        } catch (err) {
            console.error("Error updating guest credentials:", err);
            setError("Failed to update user credentials.");
        }
    };

    return (
        <div className="admin-page">
            <h1 className="dashboard-heading">Reset Guest Credentials</h1>
            <p className="welcome-message">Enter the guest's phone number to reset their credentials.</p>

            <div className="admin-actions">
                <input
                    type="text"
                    placeholder="Guest Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button className="admin-button" onClick={handleSearch}>Search</button>
            </div>

            {error && <p className="error">{error}</p>}

            {guestInfo && (
                <div className="admin-actions">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="admin-button" onClick={handleUpdate}>Update Credentials</button>
                </div>
            )}
        </div>
    );
};

export default ResetUserPage;

