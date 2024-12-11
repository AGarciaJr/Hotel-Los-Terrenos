import React, { useState } from 'react';
import './AddCorporationModal.css';
import serviceAPI from "../../services/serviceAPI";

const AddCorporationModal = ({ onClose }) => {
    const [corporationName, setCorporationName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await serviceAPI.createCorporation({ name: corporationName });
            if (response.statusCode === 200) {
                setSuccess(`Corporation created successfully with ID: ${response.corporation.id}`);
                setCorporationName('');
                setTimeout(() => {
                    onClose();
                }, 2000);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error creating corporation');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Add New Corporation</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-content">
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <div className="form-group">
                            <label>Corporation Name:</label>
                            <input
                                type="text"
                                value={corporationName}
                                onChange={(e) => setCorporationName(e.target.value)}
                                placeholder="Enter corporation name"
                                required
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Create Corporation</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCorporationModal;