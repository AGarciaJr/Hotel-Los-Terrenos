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
                console.log('User profile response:', response);
                if (response && response.user) {
                    setClerkName(response.user.name);
                }
            } catch (error) {
                console.error('Error fetching clerk details:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClerkName();
    }, []);

    return (
        <div className="clerk-page">
            <h1 className="welcome-message">
                {loading ? 'Loading...' : `Welcome, ${clerkName}`}
            </h1>
            <div className="clerk-actions">
                {/** Add Buttons*/}
                <button className="clerk-button" onClick={() => navigate('/clerk/add-room')}>
                    Add Room
                </button>

                {/** Edit Button*/}
                <button className="clerk-button" onClick={() => navigate('/clerk/edit-room')}>
                    Edit Room
                </button>
            </div>
        </div>
    );
}

export default ClerkPage;
