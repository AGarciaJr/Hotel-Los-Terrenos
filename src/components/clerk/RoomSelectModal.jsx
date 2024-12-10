import React from "react";
import RoomCard from "../RoomCard";
import { sortRoomsByType } from "../../utils/roomUtils";
import "./RoomSelectModal.css";

const RoomSelectionModal = ({ rooms = [], onClose, onSelectRoom, buttonLabel }) => {
    if (!rooms || rooms.length === 0) {
        return (
            <div className="select-modal-backdrop">
                <div className="select-modal">
                    <h2>No rooms available.</h2>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="select-modal-backdrop">
            <div className="select-modal">
                <h2>{buttonLabel === "Reserve Room" ? "Select a Room to Reserve" : "Select a Room to Edit"}</h2>
                <button className="select-close-button" onClick={onClose}>
                    Close
                </button>
                <div className="select-rooms-container">
                    {rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            onButtonClick={onSelectRoom}
                            buttonLabel={buttonLabel}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomSelectionModal;
