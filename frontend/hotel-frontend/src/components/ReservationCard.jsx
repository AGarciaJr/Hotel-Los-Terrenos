import React from "react";
import "./ReservationCard.css";

const ReservationCard = ({ reservation }) => {
    return (
        <div className="reservation-card">
            <h3>Reservation Details</h3>
            <p><strong>Check-in Date:</strong> {reservation.checkInDate}</p>
            <p><strong>Check-out Date:</strong> {reservation.checkOutDate}</p>
            <p><strong>Adults:</strong> {reservation.numberOfAdults}</p>
            <p><strong>Children:</strong> {reservation.numberOfChildren}</p>
        </div>
    );
};

export default ReservationCard;
