import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoomSelectModal from "../../components/clerk/RoomSelectModal";
import AddRoomModal from "../../components/clerk/AddRoomModal";
import GuestModal from "../../components/clerk/GuestModal";
import AddFloorModal from "../../components/clerk/AddFloorModal";
import serviceAPI from "../../services/serviceAPI";
import "./ResetUserPage.css";

const ResetPage = () => {
    const [clerkName, setClerkName] = useState("");
    const [loading, setLoading] = useState(true);
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [guests, setGuests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await serviceAPI.getAllGuests();
                setGuests(response.userList || []);
            } catch (error) {
                console.error("Error fetching guests:", error.message);
            }
        };
        fetchGuests();
    }, []);

    return (
        <div className="clerk-page">
            <h1 className="welcome-message">
                {'Choose Guest to Reset'}
            </h1>
            <div className="clerk-actions">
                <button className="clerk-button" onClick={() => setShowGuestModal(true)}>
                    View Guests
                </button>
            </div>


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

export default ResetPage;
