// src/components/ReservationCard.jsx

import React from "react";
import "./ReservationCard.css";

const ReservationCard = ({ reservation, onCheckIn, onCheckOut, onEdit }) => {
    const handleCheckInClick = () => {
        const confirmCheckIn = window.confirm("Do you wish to check in?");
        if (confirmCheckIn) {
            onCheckIn(reservation.id);
        }
    };

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
            <p>Status: {reservation.status}</p>

            {reservation.status === 'BOOKED' && (
                <button className="checkin-button" onClick={handleCheckInClick}>
                    Check In
                </button>
            )}

            {reservation.status === 'CHECKED_IN' && (
                <button className="checkout-button" onClick={handleCheckOutClick}>
                    Check Out
                </button>
            )}

            {/* "Edit Reservation" Button */}
            <button className="edit-button" onClick={handleEditClick}>
                Edit Reservation
            </button>
        </div>
    );
};

export default ReservationCard;