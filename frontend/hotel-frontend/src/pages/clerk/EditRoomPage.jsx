import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import serviceAPI from '../../services/serviceAPI';
import "./EditRoomPage.css";

const EditRoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomNumber: "",
        roomType: "",
        roomPrice: "",
        qualityLevel: "",
        bedType: "",
        smokingStatus: false,
        roomDescription: "",
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await serviceAPI.getRoomById(roomId);
                const room = response.room;
                setRoomDetails({
                    roomNumber: room.roomNumber,
                    roomType: room.roomType,
                    roomPrice: room.roomPrice,
                    qualityLevel: room.qualityLevel,
                    bedType: room.bedType,
                    smokingStatus: room.smokingStatus,
                    roomDescription: room.roomDescription,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const result = await serviceAPI.updateRoom(roomId, roomDetails);
            if (result.statusCode === 200) {
                setSuccess('Room updated successfully.');
                setTimeout(() => {
                    setSuccess('');
                    navigate('/clerk');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="edit-room-container">
            <h2>Edit Room</h2>
            {error && <p className="edit-error-message">{error}</p>}
            {success && <p className="edit-success-message">{success}</p>}
            <div className="edit-room-form">
                <div className="edit-form-group">
                    <label>Room Type</label>
                    <input
                        type="text"
                        name="roomType"
                        value={roomDetails.roomType}
                        onChange={handleChange}
                    />
                </div>

                <div className="edit-form-group">
                    <label>Room Price</label>
                    <input
                        type="number"
                        name="roomPrice"
                        value={roomDetails.roomPrice}
                        onChange={handleChange}
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
                        <option value={true}>Smoking</option>
                        <option value={false}>Non-Smoking</option>
                    </select>
                </div>

                <div className="edit-form-group">
                    <label>Room Description</label>
                    <textarea
                        name="roomDescription"
                        value={roomDetails.roomDescription}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <button className="edit-update-button" onClick={handleUpdate}>
                    Update Room
                </button>
            </div>
        </div>
    );
};

export default EditRoomPage;
