import React from "react";
import GuestCard from "../../components/GuestCard"; // Import the new GuestCard component
import "./GuestModal.css";

const GuestsModal = ({ guests, onClose, onViewReservations, onViewInformation }) => {
    return (
        <div className="guests-modal">
            <div className="guests-modal-content">
                <h2>Current Guests</h2>
                <button className="close-button" onClick={onClose}>Close</button>
                <div className="guests-list">
                    {guests.length > 0 ? (
                        guests.map((guest) => (
                            <GuestCard
                                key={guest.id}
                                guest={guest}
                                onViewReservations={() => onViewReservations(guest.id)}
                                onViewInformation={() => onViewInformation}
                            />
                        ))
                    ) : (
                        <p>No guests found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GuestsModal;
