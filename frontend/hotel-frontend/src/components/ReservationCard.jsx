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

    const checkInDate = new Date(reservation.checkInDate);
    const checkOutDate = new Date(reservation.checkOutDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);

    const isTodayBetween = today >= checkInDate && today <= checkOutDate;

    return (
        <div className="reservation-card">
            <h3>Reservation Details</h3>
            <p><strong>Confirmation Code:</strong> {reservation.reservationConfirmationCode}</p>
            <p><strong>Check-in Date:</strong> {new Date(reservation.checkInDate).toLocaleDateString()}</p>
            <p><strong>Check-out Date:</strong> {new Date(reservation.checkOutDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {reservation.status}</p>

            {isTodayBetween && reservation.status === 'BOOKED' && (
                <button className="checkin-button" onClick={handleCheckInClick}>
                    Check In
                </button>
            )}

            {isTodayBetween && reservation.status === 'CHECKED_IN' && (
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
