import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoomSelectModal from "../../components/clerk/RoomSelectModal";
import AddRoomModal from "../../components/clerk/AddRoomModal";
import serviceAPI from "../../services/serviceAPI";
import "./ClerkPage.css";

const ClerkPage = () => {
    const [clerkName, setClerkName] = useState("");
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false); // For Edit Room Modal
    const [showAddModal, setShowAddModal] = useState(false); // For Add Room Modal
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
        setShowEditModal(false); // Hide modal
        navigate(`/clerk/edit-room/${roomId}`); // Navigate to Edit Room Page
    };

    return (
        <div className="clerk-page">
            <h1 className="welcome-message">
                {loading ? "Loading..." : `Welcome, ${clerkName}`}
            </h1>
            <div className="clerk-actions">
                <button className="clerk-button" onClick={() => setShowEditModal(true)}>
                    Edit Rooms
                </button>
                <button className="clerk-button" onClick={() => setShowAddModal(true)}>
                    Add Rooms
                </button>
            </div>

            {/* Edit Room Modal */}
            {showEditModal && (
                <RoomSelectModal
                    rooms={rooms}
                    onClose={() => setShowEditModal(false)}
                    onSelectRoom={handleRoomSelection}
                />
            )}

            {/* Add Room Modal */}
            {showAddModal && (
                <AddRoomModal
                    onClose={() => setShowAddModal(false)}
                />
            )}
        </div>
    );
};

export default ClerkPage;
