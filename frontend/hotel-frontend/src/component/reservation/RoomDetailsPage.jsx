import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import serviceAPI from '../../service/serviceAPI';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RoomDetailsPage = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [numAdults, setNumAdults] = useState(1);
    const [numChildren, setNumChildren] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalGuests, setTotalGuests] = useState(1);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [userId, setUserId] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await serviceAPI.getRoomById(roomId);
                setRoomDetails(response.room);
                const userProfile = await serviceAPI.getUserProfile();
                setUserId(userProfile.user.id);
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [roomId]);

    const formatDate = (date) => {
        return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    };

    const validateReservation = () => {
        if (!checkInDate || !checkOutDate) {
            setErrorMessage('Please select check-in and check-out dates.');
            return false;
        }
        if (isNaN(numAdults) || numAdults < 1 || isNaN(numChildren) || numChildren < 0) {
            setErrorMessage('Please enter valid numbers for adults and children.');
            return false;
        }
        return true;
    };

    const handleConfirmReservation = () => {
        if (!validateReservation()) return;
        const totalDays = Math.round(Math.abs((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))) + 1;
        setTotalPrice(roomDetails.roomPrice * totalDays);
        setTotalGuests(numAdults + numChildren);
    };

    const acceptReservation = async () => {
        if (!validateReservation()) return;
        setIsSubmitting(true);
        try {
            const reservation = {
                checkInDate: formatDate(checkInDate),
                checkOutDate: formatDate(checkOutDate),
                numOfAdults: numAdults,
                numOfChildren: numChildren
            };
            const response = await serviceAPI.reserveRoom(roomId, userId, reservation);
            if (response.statusCode === 200) {
                setConfirmationCode(response.reservationConfirmationCode);
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/rooms');
                }, 10000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <p className='room-detail-loading'>Loading room details...</p>;
    if (error) return <p className='room-detail-loading'>{error}</p>;
    if (!roomDetails) return <p className='room-detail-loading'>Room not found.</p>;

    const { roomType, roomPrice, roomPhotoUrl, description, reservations } = roomDetails;

    return (
        <div className="room-details-reservation">
            {showMessage && <p className="success-message">Reservation successful! Confirmation code: {confirmationCode}.</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <h2>Room Details</h2>
            <img src={roomPhotoUrl} alt={roomType} className="room-details-image" />
            <div className="room-details-info">
                <h3>{roomType}</h3>
                <p>Price: ${roomPrice} / night</p>
                <p>{description}</p>
            </div>
            {/* Reservation details and booking section */}
            <div className="reservation-info">
                {!showDatePicker ? (
                    <button className="reserve-now-button" onClick={() => setShowDatePicker(true)}>Reserve Now</button>
                ) : (
                    <button className="go-back-button" onClick={() => setShowDatePicker(false)}>Go Back</button>
                )}
                {showDatePicker && (
                    <div>
                        {/* Date pickers and guest inputs */}
                        <button onClick={handleConfirmReservation}>Calculate Total</button>
                        <button onClick={acceptReservation} disabled={isSubmitting}>Confirm Reservation</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomDetailsPage;
