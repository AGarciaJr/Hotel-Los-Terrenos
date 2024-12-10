import React from "react";
import "./GuestCard.css";

const GuestCard = ({ guest, onViewReservations, onMakeReservation }) => {
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
                <button
                    className="make-reservations-button"
                    onClick={() => onMakeReservation(guest.id)}
                >
                    Make Reservation
                </button>
            </div>
        </div>
    );
};

export default GuestCard;
