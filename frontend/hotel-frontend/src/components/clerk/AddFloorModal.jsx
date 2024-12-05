import React, { useState } from "react";
import serviceAPI from "../../services/serviceAPI";
import "./AddFloorModal.css";

const AddFloorModal = ({ onClose }) => {
    const [floorName, setFloorName] = useState("");
    const [theme, setTheme] = useState("");
    const [floorNumber, setNumber] = useState("");
    const [roomTypes, setRoomTypes] = useState([])
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleOnSubmit = async () => {
        if (!floorName || !theme) {
            setError("Please fill out all fields.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        const parsedFloorNumber = parseInt(floorNumber, 10);
        if (isNaN(parsedFloorNumber)) {
            setError("Floor Number must be a valid number.");
            setTimeout(() => setError(""), 3000);
            return;
        }

        try {
            const response = await serviceAPI.addNewFloor({
                name: floorName,
                theme,
                number: parsedFloorNumber,
                types: roomTypes
            });

            if (response.statusCode === 200) {
                setSuccess("Floor added successfully.");
                setTimeout(() => {
                    setSuccess("");
                    onClose(); // Close modal after successful submission
                }, 2000);
            } else {
                setError(response.message || "Failed to add floor.");
            }
        } catch (error) {
            console.error("Error adding floor:", error.message);
            setError(error.message || "Failed to add floor.");
        }
    };

    return (
        <div className="add-modal">
            <div className="add-modal-content">
                <h2>Add New Floor</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div className="add-form-group">
                    <label>Floor Name</label>
                    <input
                        type="text"
                        value={floorName}
                        onChange={(e) => setFloorName(e.target.value)}
                    />
                </div>
                <div className="add-form-group">
                    <label>Theme</label>
                    <input
                        type="text"
                        value={theme}
                        onChange={(e) => setTheme(e.target.value)}
                    />
                </div>
                <div className="add-form-group">
                    <label>Floor Number</label>
                    <input
                        type="number"
                        value={floorNumber}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <div className="add-form-group">
                    <label>Room Types (comma separated)</label>
                    <input
                        type="text"
                        value={roomTypes}
                        onChange={(e) => setRoomTypes(e.target.value)}
                        placeholder="e.g. Single, Double, Family"
                    />
                </div>
                <div className="add-modal-buttons">
                    <button onClick={handleOnSubmit}>Add Floor</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddFloorModal;
