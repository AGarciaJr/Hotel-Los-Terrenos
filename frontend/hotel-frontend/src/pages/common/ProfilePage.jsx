import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import serviceAPI from "../../services/serviceAPI";
import ReservationCard from "../../components/ReservationCard"
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css"

const ProfilePage = () => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    // Fetch user profile and reservations
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = userId
                ? await serviceAPI.getUserById(userId)
                : await serviceAPI.getUserProfile();
                setUserDetails({
                    name: response.user.name,
                    email: response.user.email,
                    phoneNumber: response.user.phoneNumber,
                });

                const reservationsResponse = userId
                ? await serviceAPI.getUserReservations(userId)
                : await serviceAPI.getUserReservations(response.user.id);
                setReservations(reservationsResponse.user.reservations || []);
            } catch (error) {
                setError("Failed to load user details.");
            }
        };
        fetchUserProfile();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            const updatedUser = await serviceAPI.updateUserDetails(userDetails);
            setSuccess("User details updated successfully.");
        } catch (error) {
            setError("Failed to update user details.");
        }
    };

    const handleCheckOut = async (reservationId) => {
        try {
            const response = await serviceAPI.checkOutReservation(reservationId);
            alert(response.message || "Checked out successfully.");
            setReservations((prev) => prev.filter((res) => res.id !== reservationId));
        }catch (error) {
            alert(error.message || "Failed to check out.");
        }
    };

    return (

        <div className="profile-page">
            <h2>{userId ? "Guest Profile" : "Your Profile"}</h2>
            {error && <p className="profile-error-message">{error}</p>}
            {success && <p className="profile-success-message">{success}</p>}
            <div className="profile-form">
                <div className="profile-form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userDetails.phoneNumber}
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
            <h3>{userId ? "Guest Reservations" : "Your Reservations"}</h3>
            <div className="profile-reservations-list">
                {!reservations || reservations.length === 0 ? (
                    <p>No reservations found.</p>
                ) : (
                    reservations.map((reservation) => (
                        <ReservationCard
                            key={reservation.id}
                            reservation={reservation}
                            onCheckOut={handleCheckOut}
                        />
                    ))
                )}

            </div>
        </div>
    );
};

export default ProfilePage;
