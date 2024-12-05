import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoomSelectModal from "../../components/clerk/RoomSelectModal";
import AddRoomModal from "../../components/clerk/AddRoomModal";
import GuestModal from "../../components/clerk/GuestModal";
import serviceAPI from "../../services/serviceAPI";
import "./ClerkPage.css";

const ClerkPage = () => {
    const [clerkName, setClerkName] = useState("");
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [guests, setGuests] = useState([]); // Update to guests
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

        const fetchGuests = async () => {
            try {
                const response = await serviceAPI.getAllGuests();
                setGuests(response.userList || []);
            } catch (error) {
                console.error("Error fetching guests:", error.message);
            }
        };


        fetchClerkName();
        fetchRooms();
        fetchGuests();
    }, []);

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
                <button className="clerk-button" onClick={() => setShowGuestModal(true)}>
                    View Guests
                </button>
            </div>

            {showEditModal && (
                <RoomSelectModal
                    rooms={rooms}
                    onClose={() => setShowEditModal(false)}
                    onSelectRoom={(roomId) => {
                        setShowEditModal(false);
                        navigate(`/clerk/edit-room/${roomId}`);
                    }}
                />
            )}

            {showAddModal && (
                <AddRoomModal
                    onClose={() => setShowAddModal(false)}
                />
            )}

            {showGuestModal && (
                <GuestModal
                    guests={guests}
                    onClose={() => setShowGuestModal(false)}
                    onViewReservations={(guestId) => {
                        setShowGuestModal(false);
                        navigate(`/profile/${guestId}`);
                    }}
                />
            )}
        </div>
    );
};

export default ClerkPage;
