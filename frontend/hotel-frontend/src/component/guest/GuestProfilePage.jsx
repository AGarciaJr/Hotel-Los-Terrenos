import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import serviceAPI from '../../service/serviceAPI';

const GuestProfilePage = () => {
    const [guestName, setGuestName, guestReservations, setGuestReservations] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGuestProfile = async () => {
            try {
                const response = await serviceAPI.getUserProfile();
                if (response && response.user) {
                    setGuestName(response.user.name);
                }
            }catch (error) {
                console.error('Error fetching guest details:', error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserReservations = async () => {
            try {
                const response = await serviceAPI.getUserReservations();
                if (response && response.user) {
                    setGuestReservations(response.user.reservations)
                }
            } catch (error) {
                console.error('Error fetching guest details:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGuestProfile();
        fetchUserReservations();
    }, []);

    return (
        <div className="guest-page">
            <h1 className="dashboard-heading">Guest Dashboard</h1>
            <h2 className="welcome-message">
                {loading ? 'Loading...' : `Welcome, ${guestName}`}
            </h2>

            <div className="guest-resevations">
                <h3 className="reservation-list">
                    {loading ? 'Loading...': `Reservations: ${guestReservations}`}
                </h3>
            </div>

        </div>
    );
};

export default GuestProfilePage;