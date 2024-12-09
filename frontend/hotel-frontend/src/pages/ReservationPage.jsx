import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import serviceAPI from '../services/serviceAPI';
import './ReservationPage.css';


const ReservationPage = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userId, setUserId] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await serviceAPI.getRoomById(roomId);
                setRoomDetails(response.room);

                const userProfile = await serviceAPI.getUserProfile();
                setUserId(userProfile.user.id);
            } catch (error) {
                setErrorMessage('Error fetching room details or user profile');
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const calculateTotalAmount = (pricePerNight, checkIn, checkOut) => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const numberOfNights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return pricePerNight * numberOfNights;
    };

    const handleConfirmReservation = async () => {
        if (numAdults < 1 || numAdults > 4 || numChildren < 0) {
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

        console.log("Reservation Data: ", reservation);

        try {
            const response = await serviceAPI.reserveRoom(roomId, userId, reservation);
            if (response.statusCode === 200) {
                setConfirmationCode(response.reservationConfirmationCode); //
                //setTimeout(() => navigate(`/`), 5000); // Redirect after 5 seconds
                // This shows payment modal instead of setting confirmation directly
                setShowPaymentModal(true);

                // TODO: Store the reservation ID from response for payment processing
                // const reservationId = response.reservationId;
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

    // Handler for proceeding to payment
    const handleProceedToPayment = () => {
        // TODO: Stripe integration personnel will implement this
        // This function should:
        // 1. Call the backend to create a Stripe session
        // 2. Redirect to Stripe checkout page
        console.log('Proceeding to payment...');
    };

    const handlePaymentModalClose = () => {
        setShowPaymentModal(false);
        // TODO: Stripe integration personnel should handle any cleanup needed
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

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Complete Your Payment</h2>
                            <button
                                className="close-button"
                                onClick={handlePaymentModalClose}
                                aria-label="Close"
                            >
                                ×
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="amount-container">
                                <span className="amount-label">Total Amount</span>
                                <span className="amount-value">
                        ${calculateTotalAmount(roomDetails.roomPrice, checkInDate, checkOutDate)}
                    </span>
                            </div>
                            <p className="redirect-text">
                                You will be redirected to complete your payment securely.
                            </p>
                        </div>
                        <div className="modal-buttons">
                            <button
                                className="cancel-button"
                                onClick={handlePaymentModalClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="proceed-button"
                                onClick={handleProceedToPayment}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {confirmationCode && <p>Your reservation is confirmed! Confirmation code: {confirmationCode}</p>}
        </div>
    );
};

export default ReservationPage;
