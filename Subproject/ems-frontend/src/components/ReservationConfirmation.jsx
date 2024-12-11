import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReservationConfirmation.css';

const ReservationConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { roomDetails, reservationDetails } = location.state || {};

    if (!roomDetails || !reservationDetails) {
        navigate('/rooms');
        return null;
    }

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <div className="success-icon">✓</div>
                <h2>Reservation Confirmed!</h2>

                <div className="confirmation-details">
                    <h3>Booking Details</h3>
                    <p>Room: {roomDetails.roomType} - Room {roomDetails.roomNumber}</p>
                    <p>Check-in: {new Date(reservationDetails.checkInDate).toLocaleDateString()}</p>
                    <p>Check-out: {new Date(reservationDetails.checkOutDate).toLocaleDateString()}</p>
                    <p>Number of Guests: {reservationDetails.numberOfGuests}</p>
                </div>

                <div className="confirmation-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate('/rooms')}
                    >
                        Return to Rooms
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservationConfirmation;