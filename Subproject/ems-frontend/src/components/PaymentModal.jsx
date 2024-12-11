import React, { useState, useEffect } from 'react';
import { getUser } from '../services/UserService'; // Update this import to your actual User service path
import './PaymentModal.css';

const PaymentModal = ({ room, reservationDetails, userId, onClose, onSubmit }) => {
    const [isCorporate, setIsCorporate] = useState(false);
    const [corporationName, setCorporationName] = useState('');

    useEffect(() => {
        const checkUserCompany = async () => {
            try {
                const response = await getUser(userId);
                if (response.data && response.data.company && response.data.company !== 'Not Applicable') {
                    setIsCorporate(true);
                    setCorporationName(response.data.company);
                } else {
                    setIsCorporate(false);
                    setCorporationName('');
                }
            } catch (error) {
                console.error('Error checking user company:', error);
                setIsCorporate(false);
                setCorporationName('');
            }
        };

        if (userId) {
            checkUserCompany();
        }
    }, [userId]);

    const calculateTotal = () => {
        const checkIn = new Date(reservationDetails.checkInDate);
        const checkOut = new Date(reservationDetails.checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        return (room.roomPrice * nights).toFixed(2);
    };

    return (
        <div className="payment-modal-overlay">
            <div className="payment-modal">
                <h3>Payment Details</h3>

                <div className="reservation-summary">
                    <h4>Reservation Summary</h4>
                    <p>Room: {room.roomType} - Room {room.roomNumber}</p>
                    <p>Check-in: {new Date(reservationDetails.checkInDate).toLocaleDateString()}</p>
                    <p>Check-out: {new Date(reservationDetails.checkOutDate).toLocaleDateString()}</p>
                    <p>Number of Guests: {reservationDetails.numberOfGuests}</p>
                    <p className="total">Total Amount: ${calculateTotal()}</p>
                </div>

                {isCorporate ? (
                    <div className="corporate-payment-info">
                        <div className="corporate-message">
                            <p><strong>{corporationName}</strong> will be charged for this reservation.</p>
                            <p className="corporate-note">* The invoice will be sent directly to the corporation.</p>
                        </div>
                    </div>
                ) : (
                    <div className="payment-form">
                        <div className="form-group">
                            <label>Card Number</label>
                            <input type="text" placeholder="**** **** **** ****" disabled />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input type="text" placeholder="MM/YY" disabled />
                            </div>
                            <div className="form-group">
                                <label>CVV</label>
                                <input type="text" placeholder="***" disabled />
                            </div>
                        </div>
                    </div>
                )}

                <div className="modal-buttons">
                    <button
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={onSubmit}
                    >
                        {isCorporate ? 'Confirm Corporate Booking' : 'Confirm Payment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;