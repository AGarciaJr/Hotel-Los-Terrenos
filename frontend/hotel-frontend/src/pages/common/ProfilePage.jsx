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
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    })
    const [originalEmail, setOriginalEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = userId
                    ? await serviceAPI.getUserById(userId)
                    : await serviceAPI.getUserProfile();

                console.log("Raw profile response:", response);

                const userData = response.user || response;
                console.log("User data extracted:", userData);

                setOriginalEmail(userData.email);
                setUserDetails({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                });

                console.log("Set userDetails to:", {
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                });

                const reservationsResponse = userId
                ? await serviceAPI.getUserReservations(userId)
                : await serviceAPI.getUserReservations(response.user.id);
                setReservations(reservationsResponse.user.reservations || []);
            } catch (error) {
                console.error("Full error details:", error);
                setError(error.response?.data?.message || "Failed to load user details.");
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
        if(validateForm()){
            try {
                const currentEmail = userDetails.email;
                if (currentEmail.includes('_admin@')) {
                    const newEmailRemovesAdmin = !currentEmail.includes('_admin@');
                    if (newEmailRemovesAdmin) {
                        setError("Cannot remove _admin@ from email to maintain admin role");
                        return;
                    }
                }
                if (currentEmail.includes('_clerk@')) {
                    const newEmailRemovesClerk = !currentEmail.includes('_clerk@');
                    if (newEmailRemovesClerk) {
                        setError("Cannot remove _clerk@ from email to maintain clerk role");
                        return;
                    }
                }

                const isEmailChanged = originalEmail !== userDetails.email;
                const targetUserId = userId || userDetails.id;
                if (!targetUserId) {
                    setError("No user ID available");
                    return;
                }

                setIsLoading(true);
                const response = await serviceAPI.updateUserDetails(targetUserId, userDetails);
                setSuccess(response.message);
                setError("");

                await new Promise(resolve => setTimeout(resolve, 2000));

                if (isEmailChanged) {
                    localStorage.clear();
                    navigate('/login', {
                        state: { message: "Email has been updated. Please login with your new email." }
                    });
                } else {
                    setIsLoading(false);
                    setSuccess("");
                    navigate(`/profile/${targetUserId}`);
                }
            } catch (error) {
                setIsLoading(false);
                if (error.response?.data?.message.includes("_admin@") ||
                    error.response?.data?.message.includes("_clerk@")) {
                    setError(error.response.data.message);
                } else {
                    console.error("Update error:", error);
                    setError(error.response?.data?.message || "Failed to update user details.");
                }
            }
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

    function validateForm() {
        let valid = true;
        const errorsCopy = {...errors};

        if (!userDetails.name.trim()) {
            errorsCopy.name = 'Name is Required';
            valid = false;
        } else {
            errorsCopy.name = '';
        }

        if (!userDetails.email.trim()) {
            errorsCopy.email = 'Email is Required';
            valid = false;
        } else {
            errorsCopy.email = '';
        }

        if (!userDetails.phoneNumber.trim()) {
            errorsCopy.phoneNumber = 'Phone Number is Required';
            valid = false;
        } else {
            errorsCopy.phoneNumber = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

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
                        className={errors.name ? 'error-input' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="profile-form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                        className={errors.email ? 'error-input' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                    {userDetails.email.includes('_admin@') && (
                        <small className="email-warning">Email must include '_admin@' </small>
                    )}
                    {userDetails.email.includes('_clerk@') && (
                        <small className="email-warning">Email must include '_clerk@' </small>
                    )}
                </div>
                <div className="profile-form-group">
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userDetails.phoneNumber}
                        onChange={handleChange}
                        className={errors.phoneNumber ? 'error-input' : ''}
                    />
                    {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
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
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <img
                            src="/hotel-images/Hotel-Loading-Animation.gif"
                            alt="Loading..."
                            className="loading-gif"
                        />
                        <p>Redirecting to login...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
