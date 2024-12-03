import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import AuthModal from "../components/AuthModal";
import serviceAPI from "../services/serviceAPI";

const LandingPage = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await serviceAPI.getAllAvailableRooms();
                console.log("API Response:", response);
                if (response.roomList && Array.isArray(response.roomList)) {
                    setRooms(response.roomList);
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (err) {
                console.error("Failed to fetch rooms:", err.message);
                setError(err.message || "Failed to load rooms.");
                setRooms([]); // Fallback to empty array
            }
        };
        fetchRooms();
    }, []);

    const handleReserveNow = (roomId) => {
        const isAuthenticated = localStorage.getItem("token"); // Check authentication
        if (!isAuthenticated) {
            setShowAuthModal(true); // Show login/register modal if not logged in
        } else {
            navigate(`/room-details/${roomId}`); // Navigate to room details page
        }
    };

    return (
        <div>
            <Navbar />
            <div className="landing-page">
                <h1>Welcome to Hotel Los Terrenos</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="rooms-container">
                    {rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            onReserveNow={handleReserveNow}
                        />
                    ))}
                </div>
                {showAuthModal && (
                    <AuthModal onClose={() => setShowAuthModal(false)} />
                )}
            </div>
        </div>
    );
};

export default LandingPage;
