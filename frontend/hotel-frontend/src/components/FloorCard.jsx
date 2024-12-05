import React from "react";
import "./FloorCard.css";

const FloorCard = ({ floor, onEdit }) => {
    return (
        <div className="floor-card">
            <h3>{floor.name}</h3>
            <p>Theme: {floor.theme}</p>
            <button onClick={() => onEdit(floor.id)}>Edit Floor</button>
        </div>
    );
};

export default FloorCard;
