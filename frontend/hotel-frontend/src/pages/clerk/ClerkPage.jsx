import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoomSelectModal from "../../components/clerk/RoomSelectModal";
import AddRoomModal from "../../components/clerk/AddRoomModal";
import serviceAPI from "../../services/serviceAPI";
import "./ClerkPage.css";

const ClerkPage = () => {
    const [clerkName, setClerkName] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClerkName = async () => {
            try {
                const response = await serviceAPI.getUserProfile();
                if (response && response.user) {
                    setClerkName(response.user.name);
                }
            } catch (error) {
                console.error("Error fetching clerk details:", error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchRooms = async () => {
            try {
                const response = await serviceAPI.getAllRooms();
                setRooms(response.roomList || []);
            } catch (error) {
                console.error("Error fetching rooms:", error.message);
            }
        };

        fetchClerkName();
        fetchRooms();
    }, []);

    const handleRoomSelection = (roomId) => {
        setShowModal(false); // Hide modal
        navigate(`/clerk/edit-room/${roomId}`); // Navigate to Edit Room Page
    };

    return (
        <div className="clerk-page">
            <h1 className="welcome-message">
                {loading ? "Loading..." : `Welcome, ${clerkName}`}
            </h1>
            <div className="clerk-actions">
                <button className="clerk-button" onClick={() => setShowModal(true)}>
                    Edit Rooms
                </button>
                 <button className="clerk-button" onCl>
                     Add Rooms
                 </button>
            </div>

            {/* Room Selection Modal */}
            {showModal && (
                <RoomSelectModal
                    rooms={rooms}
                    onClose={() => setShowModal(false)}
                    onSelectRoom={handleRoomSelection}
                />
            )}
        </div>
    );
};

export default ClerkPage;
