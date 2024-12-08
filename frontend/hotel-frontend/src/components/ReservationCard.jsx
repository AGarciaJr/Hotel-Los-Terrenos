import React from "react";
import "./ReservationCard.css";

const ReservationCard = ({ reservation, onCheckOut, onEdit }) => {
    const handleCheckOutClick = () => {
        const confirmCheckOut = window.confirm("Do you wish to check out?");
        if (confirmCheckOut) {
            onCheckOut(reservation.id);
        }
    };

    const handleEditClick = () => {
        onEdit(reservation.reservationConfirmationCode);
    };

    return (
        <div className="reservation-card">
            <h3>Reservation Details</h3>
            <p>Confirmation Code: {reservation.reservationConfirmationCode}</p>
            <p>Check-in Date: {reservation.checkInDate}</p>
            <p>Check-out Date: {reservation.checkOutDate}</p>
            <button className="checkout-button" onClick={handleCheckOutClick}>
                Check Out
            </button>
            <button className="edit-button" onClick={handleEditClick}>
                Edit Reservation
            </button>
        </div>
    );
};

export default ReservationCard;
