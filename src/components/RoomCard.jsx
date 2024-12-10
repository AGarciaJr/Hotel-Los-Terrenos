import React from "react";
import "./RoomCard.css";

const RoomCard = ({ room, onButtonClick, buttonLabel = "Reserve Room" }) => {
    return (
        <div className="room-card">
            <h3>{room.roomType}</h3>
            <p>Price: ${room.roomPrice} / night</p>
            <p>{room.roomDescription}</p>
            <button onClick={() => onButtonClick(room.id)}>{buttonLabel}</button>
        </div>
    );
};

export default RoomCard;
