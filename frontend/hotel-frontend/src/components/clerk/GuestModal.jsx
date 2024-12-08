import React from "react";
import GuestCard from "../../components/GuestCard";
import "./GuestModal.css";

const GuestsModal = ({ guests, onClose, onViewReservations, onMakeReservation}) => {
    return (
        <div className="guests-modal">
            <div className="guests-modal-content">
                <h2>Current Guests</h2>
                <button className="guests-close-button" onClick={onClose}>Close</button>
                <div className="guests-list">
                    {guests.length > 0 ? (
                        guests.map((guest) => (
                            <GuestCard
                                key={guest.id}
                                guest={guest}
                                onViewReservations={() => onViewReservations(guest.id)}
                                onMakeReservation={() => onMakeReservation(guest.id)}
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
