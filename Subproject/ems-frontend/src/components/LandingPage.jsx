import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleMakeReservation = () => {
        navigate('/rooms'); //we need to create this route
    };

    const handleCancelReservation = () => {
        navigate('/cancel-reservation'); // we need to create this route
    };

    const handleCreateGuest = () => {
        navigate('/users');
    };

    const handleViewRooms =() => {
        navigate('/rooms'); // we need to create this route
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-8 text-center'>
                    <h1 className='mb-5'>Welcome to Hotel Management System</h1>
                    <div className='d-grid gap-4'>
                        <button
                            className='btn btn-primary btn-lg'
                            onClick={handleMakeReservation}
                        >
                            Make Reservation
                        </button>
                        <button
                            className='btn btn-danger btn-lg'
                            onClick={handleCancelReservation}
                        >
                            Cancel Reservation
                        </button>
                        <button
                            className='btn btn-success btn-lg'
                            onClick={handleCreateGuest}
                        >
                            Guest
                        </button>
                        <button
                            className='btn btn-warning btn-lg'
                            onClick={handleViewRooms}
                        >
                            View Rooms
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;