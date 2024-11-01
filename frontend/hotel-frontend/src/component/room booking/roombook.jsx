import React, { useState, useEffect } from 'react';
import serviceAPI from '../../service/serviceAPI';
import './roombook.css';

const BookingDemo = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingData, setBookingData] = useState({
        checkInDate: '',
        checkOutDate: ''
    });
    const [bookingStatus, setBookingStatus] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch available rooms
    useEffect(() => {
        loadRooms();
    }, []);

    const loadRooms = async () => {
        try {
            const response = await serviceAPI.getAllAvailableRooms();
            setRooms(response.roomList || []);
        } catch (error) {
            console.error('Error loading rooms:', error);
        }
    };

    const handleBooking = async () => {
        if (!selectedRoom || !bookingData.checkInDate || !bookingData.checkOutDate) {
            setBookingStatus('Please select room and dates');
            return;
        }

        setLoading(true);
        try {
            const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage
            const bookingPayload = {
                roomId: selectedRoom.id,
                userId: userId,
                checkInDate: bookingData.checkInDate,
                checkOutDate: bookingData.checkOutDate
            };

            const response = await serviceAPI.bookRoom(bookingPayload);
            setBookingStatus(`Booking successful! Confirmation code: ${response.confirmationCode}`);

            // Reload rooms to show updated availability
            await loadRooms();
        } catch (error) {
            setBookingStatus(`Booking failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-demo">
            <h2>Book a Room</h2>

            <div className="booking-section">
                <h3>Available Rooms</h3>
                <div className="rooms-grid">
                    {rooms.map(room => (
                        <div
                            key={room.id}
                            className={`room-card ${selectedRoom?.id === room.id ? 'selected' : ''}`}
                            onClick={() => setSelectedRoom(room)}
                        >
                            <h4>Room {room.roomType}</h4>
                            <p>Price: ${room.roomPrice}/night</p>
                            <p>{room.roomDescription}</p>
                        </div>
                    ))}
                </div>

                <div className="booking-form">
                    <div className="date-inputs">
                        <div>
                            <label>Check-in Date:</label>
                            <input
                                type="date"
                                value={bookingData.checkInDate}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setBookingData({
                                    ...bookingData,
                                    checkInDate: e.target.value
                                })}
                            />
                        </div>
                        <div>
                            <label>Check-out Date:</label>
                            <input
                                type="date"
                                value={bookingData.checkOutDate}
                                min={bookingData.checkInDate}
                                onChange={(e) => setBookingData({
                                    ...bookingData,
                                    checkOutDate: e.target.value
                                })}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleBooking}
                        disabled={loading || !selectedRoom}
                        className="book-button"
                    >
                        {loading ? 'Processing...' : 'Book Now'}
                    </button>

                    {bookingStatus && (
                        <div className={`status-message ${bookingStatus.includes('successful') ? 'success' : 'error'}`}>
                            {bookingStatus}
                        </div>
                    )}
                </div>
            </div>

            {selectedRoom && (
                <div className="selected-room-info">
                    <h3>Selected Room Details</h3>
                    <p>Type: {selectedRoom.roomType}</p>
                    <p>Price: ${selectedRoom.roomPrice}/night</p>
                    <p>Description: {selectedRoom.roomDescription}</p>
                </div>
            )}
        </div>
    );
};

export default BookingDemo;