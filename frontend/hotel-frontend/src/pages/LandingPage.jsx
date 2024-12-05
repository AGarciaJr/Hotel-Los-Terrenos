import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import FloorCard from "../components/FloorCard";
import AuthModal from "../components/AuthModal";
import serviceAPI from "../services/serviceAPI";
import { sortRoomsByType } from "../utils/roomUtils";
import "./LandingPage.css";

const LandingPage = () => {
    const [rooms, setRooms] = useState([]);
    const [floors, setFloors] = useState([])
    const [error, setError] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
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

        const fetchFloors = async () => {
            try {
                const response = await serviceAPI.getAllFloors();
                if (response.floorList && Array.isArray(response.floorList)) {
                    setFloors(response.floorList);
                } else {
                    throw new Error("Invalid response structure");
                }
            } catch (err) {
                setError(err.message || "Failed to load floors.");
                setFloors([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRooms();
        fetchFloors();
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
            navigate(`/reserve-room/${roomId}`);
        }
    };

    const handleFloorClick = (floorId) => {
        navigate(`/rooms/${floorId}`);
    }

    return (
        <div>
            <div className="landing-page">
                <h1>Welcome to Hotel Los Terrenos</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (

                    <div className="floors-container">
                        <h2>Which floor fits you best?</h2>
                        {floors.map((floor) => (
                            <FloorCard
                                key={floor.id}
                                floor={floor}
                                onClick={handleFloorClick}
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
