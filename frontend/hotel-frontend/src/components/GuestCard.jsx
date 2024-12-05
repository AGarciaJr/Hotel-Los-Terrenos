import React from "react";
import "./GuestCard.css";

const GuestCard = ({ guest, onViewReservations, onViewInformation }) => {
    return (
        <div className="guest-card">
            <h3>{guest.name}</h3>
            <div className="guest-actions">
                <button
                    className="view-reservations-button"
                    onClick={() => onViewReservations(guest.id)}
                >
                    View Guest Information
                </button>
            </div>
        </div>
    );
};

export default GuestCard;
