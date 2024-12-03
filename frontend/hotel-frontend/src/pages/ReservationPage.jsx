import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import serviceAPI from '../services/serviceAPI';

const ReservationPage = () => {
    const navigate = useNavigate();
    const { roomId } = useParams(); // Get the roomId from URL
    const [roomDetails, setRoomDetails] = useState(null);
    const [numAdults, setNumAdults] = useState(1); // Default as 1, ensuring it's a number
    const [numChildren, setNumChildren] = useState(0);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userId, setUserId] = useState(null); // Assuming we need the userId for the reservation

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await serviceAPI.getRoomById(roomId);
                setRoomDetails(response.room);

                // Get user details to retrieve userId
                const userProfile = await serviceAPI.getUserProfile();
                setUserId(userProfile.user.id);
            } catch (error) {
                setErrorMessage('Error fetching room details or user profile');
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleConfirmReservation = async () => {
        if (numAdults < 1 || numChildren < 0) {
            setErrorMessage('Please enter valid numbers for adults and children.');
            return;
        }

        if (!checkInDate || !checkOutDate) {
            setErrorMessage('Please select check-in and check-out dates.');
            return;
        }

        setIsSubmitting(true);

        const reservation = {
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            numberOfAdults: numAdults,
            numberOfChildren: numChildren,
        };

        // Debugging: Check the reservation object
        console.log("Reservation Data: ", reservation);

        try {
            const response = await serviceAPI.reserveRoom(roomId, userId, reservation);
            if (response.statusCode === 200) {
                setConfirmationCode(response.reservationConfirmationCode);
                setTimeout(() => navigate(`/rooms`), 5000); // Redirect after 5 seconds
            } else {
                setErrorMessage('Reservation failed. Please try again.');
            }
        } catch (error) {
            console.error("Reservation error:", error);
            setErrorMessage('Reservation failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!roomDetails) return <p>Loading room details...</p>;
    if (errorMessage) return <p className="error-message">{errorMessage}</p>;

    return (
        <div className="reservation-page">
            <h1>Reserve {roomDetails.roomType}</h1>
            <p>Price: ${roomDetails.roomPrice} / night</p>
            <p>{roomDetails.roomDescription}</p>

            <div>
                <label>Number of Adults:</label>
                <input
                    type="number"
                    value={numAdults}
                    onChange={(e) => setNumAdults(Number(e.target.value))}
                    min="1"
                />
            </div>
            <div>
                <label>Number of Children:</label>
                <input
                    type="number"
                    value={numChildren}
                    onChange={(e) => setNumChildren(Number(e.target.value))}
                    min="0"
                />
            </div>

            {/* Date Pickers */}
            <div>
                <label>Check-In Date:</label>
                <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Disallow past dates
                />
            </div>
            <div>
                <label>Check-Out Date:</label>
                <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate} // Disallow check-out before check-in
                />
            </div>

            <button onClick={handleConfirmReservation} disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
            </button>

            {confirmationCode && <p>Your reservation is confirmed! Confirmation code: {confirmationCode}</p>}
        </div>
    );
};

export default ReservationPage;
