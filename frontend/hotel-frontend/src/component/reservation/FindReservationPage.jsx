import React, { useState } from 'react';
import serviceAPI from '../../service/serviceAPI';

const FindreservationPage = () => {
    const [confirmationCode, setConfirmationCode] = useState(''); // State variable for confirmation code
    const [reservationDetails, setreservationDetails] = useState(null); // State variable for reservation details
    const [error, setError] = useState(null); // Track any errors

    const handleSearch = async () => {
        if (!confirmationCode.trim()) {
            setError("Please Enter a reservation confirmation code");
            setTimeout(() => setError(''), 5000);
            return;
        }
        try {
            // Call API to get reservation details
            const response = await serviceAPI.getreservationByConfirmationCode(confirmationCode);
            setreservationDetails(response.reservation);
            setError(null); // Clear error if successful
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="find-reservation-page">
            <h2>Find reservation</h2>
            <div className="search-container">
                <input
                    required
                    type="text"
                    placeholder="Enter your reservation confirmation code"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button onClick={handleSearch}>Find</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {reservationDetails && (
                <div className="reservation-details">
                    <h3>reservation Details</h3>
                    <p>Confirmation Code: {reservationDetails.reservationConfirmationCode}</p>
                    <p>Check-in Date: {reservationDetails.checkInDate}</p>
                    <p>Check-out Date: {reservationDetails.checkOutDate}</p>
                    <p>Num Of Adults: {reservationDetails.numOfAdults}</p>
                    <p>Num Of Children: {reservationDetails.numOfChildren}</p>

                    <br />
                    <hr />
                    <br />
                    <h3>Booker Detials</h3>
                    <div>
                        <p> Name: {reservationDetails.user.name}</p>
                        <p> Email: {reservationDetails.user.email}</p>
                        <p> Phone Number: {reservationDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />
                    <h3>Room Details</h3>
                    <div>
                        <p> Room Type: {reservationDetails.room.roomType}</p>
                        <img src={reservationDetails.room.roomPhotoUrl} alt="" sizes="" srcSet="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindreservationPage;