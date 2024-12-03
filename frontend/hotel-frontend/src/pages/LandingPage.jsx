import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import AuthModal from "../components/AuthModal";
import serviceAPI from "../services/serviceAPI";
import "./LandingPage.css";

const LandingPage = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getRoomTypeValue = (roomType) => {
        switch (roomType) {
            case 'Single': return 1;
            case 'Double': return 2;
            case 'Suite': return 3;
            default: return 4;
        }
    };

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await serviceAPI.getAllAvailableRooms();
                if (response.roomList && Array.isArray(response.roomList)) {
                    // Sort rooms based on roomType
                    const sortedRooms = response.roomList.sort((a, b) => {
                        return getRoomTypeValue(a.roomType) - getRoomTypeValue(b.roomType);
                    });
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
    }, []);

    const handleReserveNow = (roomId) => {
        if (!roomId) {
            setError("Invalid room selection.");
            return;
        }
        const isAuthenticated = localStorage.getItem("token");
        if (!isAuthenticated) {
            setShowAuthModal(true);
        } else {
            navigate(`/room-details/${roomId}`);
        }
    };

    return (
        <div>
            <div className="landing-page">
                <h1>Welcome to Hotel Los Terrenos</h1>
                {isLoading ? (
                    <p>Loading rooms...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="rooms-container">
                        {rooms.map((room) => (
                            <RoomCard
                                key={room.id}
                                room={room}
                                onReserveNow={handleReserveNow}
                            />
                        ))}
                    </div>
                )}
                {showAuthModal && (
                    <AuthModal onClose={() => setShowAuthModal(false)} />
                )}
            </div>
        </div>
    );
};

export default LandingPage;