import React from "react";
import RoomCard from "../RoomCard";
import { sortRoomsByType } from "../../utils/roomUtils";
import "./RoomSelectModal.css";

const RoomSelectionModal = ({ rooms, onClose, onSelectRoom }) => {
    const sortedRooms = sortRoomsByType(rooms);

    if (!rooms || rooms.length === 0) {
        return (
            <div className="modal-backdrop">
                <div className="modal">
                    <h2>No rooms available to edit.</h2>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>Select a Room to Edit</h2>
                <button className="close-button" onClick={onClose}>
                    ×
                </button>
                <div className="rooms-container">
                    {rooms.map((room) => (
                        <RoomCard
                            key={room.id}
                            room={room}
                            onReserveNow={onSelectRoom} // Pass the room selection handler
                            buttonLabel="Edit Room" // Customize the button label
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomSelectionModal;
