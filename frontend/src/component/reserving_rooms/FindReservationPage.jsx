import React, { useState } from 'react';
import serviceAPI from '../../service/serviceAPI';

const FindReservationPage = () => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [reservationDetails, setReservationDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if(!confirmationCode.trim()){
            setError("Please Enter a Confirmation Code");
            setTimeout(() => setError(''), 5000);
            return;
        }

        try{
            const response = await serviceAPI.getReservationByConfirmationCode(confirmationCode);
            setReservationDetails(response.reservation);
            setError(null);
        }catch(error){
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className='find-booking-page'>
            <h2>Find Booking</h2>
            <div className='search-container'>
                <input 
                required
                type="text" 
                placeholder='Enter your booking confirmation code'
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                />
                <button onClick={handleSearch}>Find</button>
            </div>
            {error && <p style={{color : 'red' }}>{error}</p>}
            {reservationDetails && (
                <div className='reservation-details'>
                    <h3>Booking Details</h3>
                    <p>Confirmation Code: {reservationDetails.reservationConfirmationCode}</p>
                    <p>Check-in Date: {reservationDetails.checkInDate}</p>
                    <p>Check-out Date: {reservationDetails.checkOutDate}</p>
                    <p> Number of Adults: {reservationDetails.numOfAdults}</p>
                    <p>Number of Childer: {reservationDetails.numOfChildren}</p>

                    <br />
                    <hr />
                    <br />

                    <h3>Reserver Details</h3>
                    <div>
                        <p>Name: {reservationDetails.user.name}</p>
                        <p>Email: {reservationDetails.user.email}</p>
                        <p>Phone Number: {reservationDetails.user.phoneNumber}</p>
                    </div>

                    <br />
                    <hr />
                    <br />

                    <h3>Room Details</h3>
                    <div>
                        <p>Room Type: {reservationDetails.room.roomType}</p>
                        <img src={reservationDetails.room.roomPhotoUrl} alt="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FindReservationPage;