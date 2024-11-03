import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from '../../service/serviceAPI';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await serviceAPI.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
        <div className="admin-page">
            <h1 className="welcome-message">Welcome, {adminName}</h1>
            <div className="admin-actions">
                <button className="admin-button" onClick={() => navigate('/admin/manage-rooms')}>
                    Manage Rooms
                </button>
                <button className="admin-button" onClick={() => navigate('/admin/manage-reservations')}>
                    Manage Reservations
                </button>
            </div>
        </div>
    );
}

export default AdminPage;