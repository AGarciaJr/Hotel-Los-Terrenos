import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoomSelectModal from "../../components/clerk/RoomSelectModal";
import AddRoomModal from "../../components/clerk/AddRoomModal";
import GuestModal from "../../components/clerk/GuestModal";
import AddFloorModal from "../../components/clerk/AddFloorModal";
import serviceAPI from "../../services/serviceAPI";
import { sortRoomsByType } from "../../utils/roomUtils";
import "./ClerkPage.css";

const ClerkPage = () => {
    const [clerkName, setClerkName] = useState("");
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [showAddFloorModal, setShowAddFloorModal] = useState(false);
    const [showReservationModal, setShowReservationModal] = useState(false);
    const [selectedGuest, setSelectedGuest] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [guests, setGuests] = useState([]);
    const [floors, setFloors] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
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
                const response = await serviceAPI.getAllAvailableRooms();
                if (response.roomList && Array.isArray(response.roomList)) {
                    const sortedRooms = sortRoomsByType(response.roomList);
                    setRooms(sortedRooms);
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (err) {
                setError(err.message || "Failed to load rooms.");
                setRooms([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRooms();

        const fetchGuests = async () => {
            try {
                const response = await serviceAPI.getAllGuests();
                setGuests(response.userList || []);
            } catch (error) {
                console.error("Error fetching guests:", error.message);
            }
        };

        const fetchFloors = async () => {
            try {
                const response = await serviceAPI.getAllFloors();
                setFloors(response.floorList || []);
            } catch (error) {
                console.error("Error fetching floors:", error.message);
            }
        };

        fetchClerkName();
        fetchRooms();
        fetchGuests();
        fetchFloors();
    }, []);

    return (
        <div className="clerk-page">
            <h1 className="welcome-message">
                {loading ? "Loading..." : `Welcome, ${clerkName}`}
            </h1>
            <div className="clerk-actions">
                <button className="clerk-button" onClick={() => setShowAddFloorModal(true)}>
                    Add Floors
                </button>
                <button className="clerk-button" onClick={() => setShowEditModal(true)}>
                    Edit Rooms
                </button>
                <button className="clerk-button" onClick={() => setShowAddRoomModal(true)}>
                    Add Rooms
                </button>
                <button className="clerk-button" onClick={() => navigate("/register")}>
                    Add Guests
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
                    buttonLabel="Edit Rooms"
                />
            )}

            {showReservationModal && selectedGuest && (
                <RoomSelectModal
                    rooms={rooms}
                    guest={selectedGuest}
                    onClose={() => setShowReservationModal(false)}
                    onSelectRoom={(roomId) => {
                        setShowReservationModal(false);
                        navigate(`/clerk/reserve-room/${roomId}/${selectedGuest.id}`);
                    }}
                    buttonLabel="Reserve Room"
                />
            )}

            {showAddRoomModal && (
                <AddRoomModal
                    onClose={() => setShowAddRoomModal(false)}
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
                    onMakeReservation={(guestId) => {
                        setShowGuestModal(false)
                        const guest = guests.find((g) => g.id === guestId);
                        if (guest) {
                            setSelectedGuest(guest);
                            setShowReservationModal(true);
                        }
                    }}
                />
            )}

            {showAddFloorModal && (
                <AddFloorModal
                    onClose={() => setShowAddFloorModal(false)}
                />
            )}
        </div>
    );
};

export default ClerkPage;
