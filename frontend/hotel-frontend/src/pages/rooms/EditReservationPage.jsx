import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import serviceAPI from "../../services/serviceAPI";
import "./EditReservationPage.css";

const EditReservationPage = () => {
    const { reservationCode } = useParams();
    const navigate = useNavigate();
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // If you have a method to get reservation by ID:
                const codeResponse = await serviceAPI.getReservationByConfirmationCode(reservationCode);
                setReservation(codeResponse.reservation);
            } catch (error) {
                setError("Failed to load reservation details.");
            }
        };
        fetchData();
    }, [reservationCode]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservation((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {

            const updateResponse = await serviceAPI.updateReservation(reservation.reservationConfirmationCode, reservation);
            setSuccess("Reservation updated successfully!");
            setError("");

            // In case it breaks
            setTimeout(() => navigate(-1), 2000);
        } catch (err) {
            console.error("Error updating reservation:", err);
            setError(err.response?.data?.message || "Failed to update reservation.");
        }
    };

    if (!reservation && !error) {
        return <p>Loading reservation details...</p>;
    }

    return (
        <div className="edit-reservation-page">
            <h2>Edit Reservation</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            {reservation && (
                <div className="edit-form">
                    <div className="form-group">
                        <label htmlFor="checkInDate">Check-in Date:</label>
                        <input
                            type="date"
                            id="checkInDate"
                            name="checkInDate"
                            value={reservation.checkInDate || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="checkOutDate">Check-out Date:</label>
                        <input
                            type="date"
                            id="checkOutDate"
                            name="checkOutDate"
                            value={reservation.checkOutDate || ""}
                            onChange={handleChange}
                        />
                    </div>


                    <button className="save-button" onClick={handleSave}>Save Changes</button>
                </div>
            )}
        </div>
    );
};

export default EditReservationPage;
