import React, { useState } from "react";
import serviceAPI from "../../services/serviceAPI";
import "./AddRoomModal.css";

const AddRoomModal = ({ onClose }) => {
    const [roomDetails, setRoomDetails] = useState({
        roomNumber: "",
        roomType: "",
        roomPrice: "",
        qualityLevel: "ECONOMY",
        bedType: "TWIN",
        smokingStatus: false,
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
                    <label>Room Number</label>
                    <input
                        type="number"
                        name="roomNumber"
                        value={roomDetails.roomNumber}
                        onChange={handleChange}
                        placeholder="Enter room number"
                        required
                    />
                </div>
                <div className="add-form-group">
                    <label>Room Type</label>
                    <input
                        type="text"
                        name="roomType"
                        value={roomDetails.roomType}
                        onChange={handleChange}
                        placeholder="Enter room type (e.g., Single, Double)"
                        required
                    />
                </div>
                <div className="add-form-group">
                    <label>Room Price</label>
                    <input
                        type="number"
                        step="0.01"
                        name="roomPrice"
                        value={roomDetails.roomPrice}
                        onChange={handleChange}
                        placeholder="Enter base price"
                        required
                    />
                </div>
                <div className="add-form-group">
                    <label>Quality Level</label>
                    <select
                        name="qualityLevel"
                        value={roomDetails.qualityLevel}
                        onChange={handleChange}
                    >
                        <option value="EXECUTIVE">Executive</option>
                        <option value="BUSINESS">Business</option>
                        <option value="COMFORT">Comfort</option>
                        <option value="ECONOMY">Economy</option>
                    </select>
                </div>
                <div className="add-form-group">
                    <label>Bed Type</label>
                    <select
                        name="bedType"
                        value={roomDetails.bedType}
                        onChange={handleChange}
                    >
                        <option value="TWIN">Twin</option>
                        <option value="FULL">Full</option>
                        <option value="QUEEN">Queen</option>
                        <option value="KING">King</option>
                    </select>
                </div>
                <div className="add-form-group">
                    <label>Smoking Status</label>
                    <select
                        name="smokingStatus"
                        value={roomDetails.smokingStatus}
                        onChange={(e) =>
                            setRoomDetails((prev) => ({
                                ...prev,
                                smokingStatus: e.target.value === "true",
                            }))
                        }
                    >
                        <option value="false">Non-Smoking</option>
                        <option value="true">Smoking</option>
                    </select>
                </div>
                <div className="add-form-group">
                    <label>Room Description</label>
                    <textarea
                        name="roomDescription"
                        value={roomDetails.roomDescription}
                        onChange={handleChange}
                        placeholder="Enter room description"
                        required
                    />
                </div>
                <div className="add-modal-buttons">
                    <button className="add-submit-button" onClick={handleSubmit}>
                        Add Room
                    </button>
                    <button className="add-close-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddRoomModal;
