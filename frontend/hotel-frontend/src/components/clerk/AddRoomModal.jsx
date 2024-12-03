import React, { useState } from "react";
import serviceAPI from "../../services/serviceAPI";
import "./AddRoomModal.css";

const AddRoomModal = ({ onClose }) => {
    const [roomDetails, setRoomDetails] = useState({
        roomType: "",
        roomPrice: "",
        roomDescription: "",
    });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await serviceAPI.addRoom(roomDetails);
            if (response.statusCode === 200) {
                setSuccess("Room added successfully!");
                setTimeout(() => {
                    setSuccess("");
                    onClose(); // Close the modal after success
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add room.");
            setTimeout(() => setError(""), 5000);
        }
    };

    return (
        <div className="add-modal">
            <div className="add-modal-content">
                <h2>Add Room</h2>
                {error && <p className="add-error-message">{error}</p>}
                {success && <p className="add-success-message">{success}</p>}
                <div className="add-form-group">
                    <label>Room Type</label>
                    <input
                        type="text"
                        name="roomType"
                        value={roomDetails.roomType}
                        onChange={handleChange}
                    />
                </div>
                <div className="add-form-group">
                    <label>Room Price</label>
                    <input
                        type="text"
                        name="roomPrice"
                        value={roomDetails.roomPrice}
                        onChange={handleChange}
                    />
                </div>
                <div className="add-form-group">
                    <label>Room Description</label>
                    <textarea
                        name="roomDescription"
                        value={roomDetails.roomDescription}
                        onChange={handleChange}
                    />
                </div>
                <div className="add-modal-buttons">
                    <button className="add-submit-button" onClick={handleSubmit}>Add Room</button>
                    <button className="add-close-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AddRoomModal;
