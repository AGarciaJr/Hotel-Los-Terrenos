import React, { useEffect } from "react";
import { useState } from "react";
import serviceAPI from "../../service/serviceAPI";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await serviceAPI.getUserProfile();

                const userPlusBookings = await serviceAPI.getUserReservations(response.user.id);
                setUser(userPlusBookings.user)
            }catch(error){
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        serviceAPI.logout();
        navigate('/home')
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return(
        <div className="profile-page">
            {user && <h2>Welcome, {user.name}</h2>}
            <div className="profile-actions">
                <button className="profile-actions" onClick={handleEditProfile}>Edit Profile</button>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
            {error && <p className="profile-details">{error}</p>}
            {user && (
                <div className="profile-details">
                    <h3>My Profile Details</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                </div>
            )}
            <div className="reservation-section">
                <h3>My Reservation History</h3>
                <div className="reservation-list">
                    {user && user.reservations.length > 0 ? (
                        user.reservations.map((reservation) => (
                            <div key={reservation.id} className="reservation-item">
                                <p><strong>Reservation Code:</strong> {reservation.reservationConfirmationCode}</p>
                                <p><strong>Check-In Date:</strong> {reservation.checkInDate}</p>
                                <p><strong>Check-In Date:</strong> {reservation.checkInDate}</p>
                                <p><strong>Check-Out Date:</strong> {reservation.checkOutDate}</p>
                                <p><strong>Total Guests:</strong> {reservation.totalNumberOfGuests}</p>
                                <p><strong>Room Type:</strong> {reservation.room.roomType}</p>
                                <img src={reservation.room.roomPhotoUrl} alt="Room" className="room-photo"/>
                            </div>
                        ))
                        ) : (
                            <p>No Reservations Found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;