import React from "react";
import GuestCard from "../../components/GuestCard";
import './GuestModal.css';

const GuestModal = ({ guests, onClose, onViewReservations, onMakeReservation }) => {
    return (
        <div className="guest-modal-overlay">
            <div className="guest-modal">
                <div className="guest-modal-header">
                    <h2>Guest List</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="guest-table-container">
                    <table className="guest-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {guests.map((guest) => (
                            <tr key={guest.id}>
                                <td>{guest.name}</td>
                                <td>{guest.email}</td>
                                <td>{guest.phoneNumber}</td>
                                <td className="action-buttons">
                                    <button
                                        onClick={() => onViewReservations(guest.id)}
                                        className="view-button"
                                    >
                                        View Reservations
                                    </button>
                                    <button
                                        onClick={() => onMakeReservation(guest.id)}
                                        className="reserve-button"
                                    >
                                        Make Reservation
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GuestModal;