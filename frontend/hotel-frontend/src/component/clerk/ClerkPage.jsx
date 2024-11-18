import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from '../../service/serviceAPI';

const ClerkPage = () => {
    const [clerkName, setClerkName] = useState('');
    const [loading, setLoading] = useState(true); // Added loading state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClerkName = async () => {
            try {
                const response = await serviceAPI.getUserProfile();
                if (response && response.user) {
                    setClerkName(response.user.name); // Assuming response.user.name is correct
                }
            } catch (error) {
                console.error('Error fetching clerk details:', error.message);
            } finally {
                setLoading(false); // Stop loading once the request is complete
            }
        };

        fetchClerkName();
    }, []);

    return (
        <div className="clerk-page">
            <h1 className="welcome-message">
                {loading ? 'Loading...' : `Welcome, ${clerkName}`} {/* Conditional rendering */}
            </h1>
            <div className="clerk-actions">
                <button className="clerk-button" onClick={() => navigate('/clerk/manage-rooms')}>
                    Manage Rooms
                </button>
                <button className="clerk-button" onClick={() => navigate('/clerk/manage-reservations')}>
                    Manage Reservations
                </button>
            </div>
        </div>
    );
}

export default ClerkPage;
