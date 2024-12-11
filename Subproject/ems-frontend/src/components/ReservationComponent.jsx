import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoom, makeReservation } from '../services/RoomService';
import { getUser } from '../services/UserService';
import './ReservationComponent.css';
import PaymentModal from "./PaymentModal.jsx";

const ReservationComponent = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [reservationDetails, setReservationDetails] = useState({
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: 1
    });

    useEffect(() => {
        if (roomId) {
            getRoom(roomId)
                .then(response => {
                    setRoom(response.data);
                })
                .catch(error => {
                    setError('Error loading room details');
                    console.error('Error:', error);
                });
        }
    }, [roomId]);

    const validateUserId = async () => {
        try {
            const response = await getUser(userId);
            return response.data != null;
        } catch (error) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate dates
        const checkIn = new Date(reservationDetails.checkInDate);
        const checkOut = new Date(reservationDetails.checkOutDate);
        const today = new Date();

        if (checkIn < today) {
            setError('Check-in date cannot be in the past');
            return;
        }

        if (checkOut <= checkIn) {
            setError('Check-out date must be after check-in date');
            return;
        }

        // Validate user ID
        const isValidUser = await validateUserId();
        if (!isValidUser) {
            setError('Invalid User ID. Please enter a valid user ID.');
            return;
        }

        // If all validations pass, show payment modal
        setShowPaymentModal(true);
    };

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handlePaymentSubmit = async () => {
        try {
            await makeReservation(roomId, userId, reservationDetails);
            navigate('/reservation-confirmation', {
                state: {
                    roomDetails: room,
                    reservationDetails: reservationDetails
                }
            });
        } catch (error) {
            setError('Error making reservation');
            setShowPaymentModal(false);
        }
    };

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div className="reservation-container">
            <h2>Make a Reservation</h2>

            {room && (
                <div className="room-details">
                    <h3>{room.roomType} - Room {room.roomNumber}</h3>
                    <p>Price: ${room.roomPrice} per night</p>
                    <p>Quality Level: {room.qualityLevel}</p>
                    <p>Bed Type: {room.bedType}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="reservation-form">
                <div className="form-group">
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={handleUserIdChange}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Check-in Date:</label>
                    <input
                        type="date"
                        value={reservationDetails.checkInDate}
                        onChange={(e) => setReservationDetails({
                            ...reservationDetails,
                            checkInDate: e.target.value
                        })}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Check-out Date:</label>
                    <input
                        type="date"
                        value={reservationDetails.checkOutDate}
                        onChange={(e) => setReservationDetails({
                            ...reservationDetails,
                            checkOutDate: e.target.value
                        })}
                        required
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Number of Guests:</label>
                    <input
                        type="number"
                        min="1"
                        value={reservationDetails.numberOfGuests}
                        onChange={(e) => setReservationDetails({
                            ...reservationDetails,
                            numberOfGuests: parseInt(e.target.value)
                        })}
                        required
                        className="form-control"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="btn btn-primary">
                    Proceed to Payment
                </button>
            </form>

            {showPaymentModal && room && (
                <PaymentModal
                    room={room}
                    reservationDetails={reservationDetails}
                    userId={userId}
                    onClose={() => setShowPaymentModal(false)}
                    onSubmit={handlePaymentSubmit}
                />
            )}
        </div>
    );
};

export default ReservationComponent;