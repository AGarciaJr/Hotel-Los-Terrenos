import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthModal from "../../components/AuthModal";
import serviceAPI from "../../services/serviceAPI";
import RoomCard from "../../components/RoomCard";
import "./RoomsPage.css";

const RoomsPage = () => {
    const { floorId } = useParams(); // Access floorId from URL
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomsForFloor = async () => {
            try {
                const response = await serviceAPI.getRoomsByFloor(floorId); // API call to get rooms by floor
                if (response.roomList && Array.isArray(response.roomList)) {
                    setRooms(response.roomList);
                } else {
                    setError("No rooms found for this floor.");
                }
            } catch (err) {
                setError(err.message || "Failed to load rooms.");
            } finally {
                setLoading(false);
            }
        };

        fetchRoomsForFloor();
    }, [floorId]);

    const handleReserveRoom = (roomId) => {
        if (!roomId) {
            setError("Invalid room selection.");
            return;
        }
        const isAuthenticated = localStorage.getItem("token");
        if (!isAuthenticated) {
            setShowAuthModal(true);
        } else {
            navigate(`/reserve-room/${roomId}`);
        }
    };

    return (
        <div className="rooms-page">
            <h1>Rooms on Floor {floorId}</h1>
            {loading ? (
                <p>Loading rooms...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div className="rooms-container">
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                onButtonClick={() => handleReserveRoom(room.id)}
                            />
                        ))
                    ) : (
                        <p>No rooms available for this floor.</p>
                    )}
                </div>
            )}

            {showAuthModal && (
                <AuthModal onClose={() => setShowAuthModal(false)} />
            )}
        </div>
    );
};

export default RoomsPage;
