import React from "react";
import "./FloorCard.css";

const FloorCard = ({ floor, onClick }) => {
    return (
        <div className="floor-card" onClick={() => onClick(floor.id)}>
            <h3>{floor.theme}</h3>
        </div>
    );
};

export default FloorCard;
