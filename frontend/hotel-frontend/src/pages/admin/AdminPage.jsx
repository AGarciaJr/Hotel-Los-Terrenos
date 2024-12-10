import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from "../../services/serviceAPI";
import "./AdminPage.css";
import AddCorporationModal from "./AddCorporationModal";

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const [loading, setLoading] = useState(true); // Loading state for fetching admin info
    const [showAddCorporationModal, setShowAddCorporationModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await serviceAPI.getUserProfile();
                console.log('API Response:', response); // Log the response to check its structure
                if (response && response.user) {
                    setAdminName(response.user.name); // Make sure this matches the response structure
                }
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            } finally {
                setLoading(false); // Stop loading once the request is complete
            }
        };

        fetchAdminName();
    }, []);


    return (
        <div className="admin-page">
            <h1 className="dashboard-heading">Admin Dashboard</h1>
            <h2 className="welcome-message">
                {loading ? 'Loading...' : `Welcome, ${adminName}`}
            </h2>
            <div className="admin-actions">
                <button className="admin-button" onClick={() => navigate('/register')}>
                    Create Clerk Account
                </button>
                <button className="admin-button" onClick={() => navigate('/admin/resetuser')}>
                    Reset User Info
                </button>
                <button className="admin-button" onClick={() => setShowAddCorporationModal(true)}>
                    Add Corporation
                </button>
            </div>

            {showAddCorporationModal && (
                <AddCorporationModal
                    onClose={() => setShowAddCorporationModal(false)}
                />
            )}
        </div>
    );
};

export default AdminPage;