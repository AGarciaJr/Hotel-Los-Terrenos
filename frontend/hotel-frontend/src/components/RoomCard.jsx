import React from "react";
import "./RoomCard.css";

const RoomCard = ({ room, onReserveNow }) => {
    return (
        <div className="room-card">
            <img src={room.roomPhotoUrl} alt={room.roomType} />
            <h3>{room.roomType}</h3>
            <p>Price: ${room.roomPrice} / night</p>
            <p>{room.roomDescription}</p>
            <button onClick={() => onReserveNow(room.id)}>Reserve Now</button>
        </div>
    );
};

export default RoomCard;
