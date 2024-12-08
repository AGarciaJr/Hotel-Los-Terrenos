// src/pages/common/CancelReservationPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import serviceAPI from '../../services/serviceAPI';

const CancelReservationPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');  // State for confirmation code input
    const [errorMessage, setErrorMessage] = useState('');  // State for error message
    const navigate = useNavigate();  // Hook to navigate after cancelation

    // Handler for canceling reservation
    const handleCancelReservation = async () => {
        if (!confirmationCode) {
            setErrorMessage('Please provide a confirmation code.');
            return;
        }

        try {
            // Fetch the reservation by confirmation code
            const reservation = await serviceAPI.getReservationByConfirmationCode(confirmationCode);

            if (reservation) {
                // Call the API to cancel the reservation using the reservation ID
                const response = await serviceAPI.cancelReservation(reservation.id);

                if (response) {
                    setErrorMessage('');
                    alert('Your reservation has been canceled.');
                    navigate('/');  // Redirect to homepage
                }
            } else {
                setErrorMessage('Reservation not found.');
            }
        } catch (error) {
            console.error('Error canceling reservation:', error);
            setErrorMessage('Cancellation failed. Please try again.');
        }
    };

    return (
        <div className="cancel-reservation-page">
            <h1>Cancel Reservation</h1>

            <div>
                <label htmlFor="confirmation-code">Confirmation Code:</label>
                <input
                    id="confirmation-code"
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    placeholder="Enter your confirmation code"
                />
            </div>

            <button onClick={handleCancelReservation}>Cancel Reservation</button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Error message display */}
        </div>
    );
};

export default CancelReservationPage;
