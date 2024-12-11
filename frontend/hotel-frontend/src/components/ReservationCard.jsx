import React, { useState, useEffect } from "react";
import serviceAPI from "../services/serviceAPI";
import "./ReservationCard.css";

const ReservationCard = ({ reservation, onCheckOut, onUpdate }) => {

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancellationFee, setCancellationFee] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [roomDetails, setRoomDetails] = useState(null);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                if (reservation && reservation.room && reservation.room.id) {
                    const response = await serviceAPI.getRoomById(reservation.room.id);
                    if (response && response.room) {
                        setRoomDetails(response.room);
                    }
                }
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchRoomDetails();
    }, [reservation]);

    const handleCheckOutClick = () => {
        const confirmCheckOut = window.confirm("Do you wish to check out?");
        if (confirmCheckOut) {
            onCheckOut(reservation.id);
        }
    };

    const calculateCancellationFee = () => {
        if (!roomDetails) return 0;

        const creationDate = new Date(reservation.reservationCreationDate);
        const now = new Date();
        const daysSinceCreation = Math.floor((now - creationDate) / (1000 * 60 * 60 * 24));

        // If cancellation is after 2 days from booking, charge 80% of one night
        if (daysSinceCreation > 2) {
            const oneNightCost = roomDetails.roomPrice;
            return oneNightCost * 0.8;
        }
        return 0;
    };

    const handleCancelClick = () => {
        const fee = calculateCancellationFee();
        setCancellationFee(fee);
        setShowCancelModal(true);
    };

    const handleConfirmCancel = async () => {
        setIsProcessing(true);
        try {
            await serviceAPI.cancelReservation(reservation.id);
            setShowCancelModal(false);
            if (onUpdate) onUpdate(); // Keep the original update callback
            // Add window reload
            window.location.reload();
        } catch (error) {
            console.error("Error canceling reservation:", error);
            alert("Failed to cancel reservation. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="reservation-card">
            <h3>Reservation Details</h3>
            <p>Confirmation Code: {reservation.reservationConfirmationCode}</p>
            <p>Check-in Date: {reservation.checkInDate}</p>
            <p>Check-out Date: {reservation.checkOutDate}</p>
            <div className="reservation-actions">
                <button className="checkout-button" onClick={handleCheckOutClick}>
                    Check Out
                </button>
                <button className="cancel-button" onClick={handleCancelClick}>
                    Cancel Reservation
                </button>
            </div>

            {showCancelModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Cancel Reservation</h2>
                        <p>Are you sure you want to cancel this reservation?</p>

                        {cancellationFee > 0 ? (
                            <div className="fee-warning">
                                <p>Since this reservation was made more than 2 days ago,
                                    a cancellation fee of ${cancellationFee.toFixed(2)} will apply.</p>
                                <p>(80% of one night's stay)</p>
                            </div>
                        ) : (
                            <p>No cancellation fee will be charged.</p>
                        )}

                        <div className="modal-buttons">
                            <button
                                className="confirm-cancel-button"
                                onClick={handleConfirmCancel}
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : "Confirm Cancellation"}
                            </button>
                            <button
                                className="modal-close-button"
                                onClick={() => setShowCancelModal(false)}
                                disabled={isProcessing}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReservationCard;