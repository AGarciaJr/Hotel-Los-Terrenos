import React from "react";
import RoomCard from "../RoomCard";
import { sortRoomsByType } from "../../utils/roomUtils";
import "./RoomSelectModal.css";

const RoomSelectionModal = ({ rooms, onClose, onSelectRoom }) => {
    const sortedRooms = sortRoomsByType(rooms);

    if (!rooms || rooms.length === 0) {
        return (
            <div className="select-modal-backdrop">
                <div className="select-modal">
                    <h2>No rooms available to edit.</h2>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="select-modal-backdrop">
            <div className="select-modal">
                <h2>Select a Room to Edit</h2>
                <button className="select-close-button" onClick={onClose}>
                    ×
                </button>
                <div className="select-rooms-container">
                    {sortedRooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            onButtonClick={onSelectRoom}
                            buttonLabel="Edit Room"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomSelectionModal;
