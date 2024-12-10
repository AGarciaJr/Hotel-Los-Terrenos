import React from "react";
import { useNavigate } from "react-router-dom";
import "./RanchPage.css";

const RanchPage = () => {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleReservation = () => {
        navigate("/vacations/ranch/reservation"); // Navigate to the reservation page
    };

    return (
        <div className="ranch-container">
            <h1>Welcome to Senor Alejandro's Ranch</h1>
            <p>Discover the beauty, adventure, and unforgettable experiences we offer.</p>

            {/* Grid of images with buttons */}
            <div className="ranch-grid">
                {/* Horseback Riding */}
                <div className="ranch-item">
                    <img
                        src="/horse.jpg"
                        alt="Horseback Riding"
                        className="ranch-image"
                    />
                    <button
                        className="ranch-button"
                        onClick={() => handleNavigate("/vacations/ranch/horseback-riding")}
                    >
                        Horseback Riding
                    </button>
                </div>

                {/* Renting Weapons */}
                <div className="ranch-item">
                    <img
                        src="/guns.jpg"
                        alt="Renting Weapons"
                        className="ranch-image"
                    />
                    <button
                        className="ranch-button"
                        onClick={() => handleNavigate("/vacations/ranch/gunshop")}
                    >
                        Vaqueros' supplement
                    </button>
                </div>

                {/* Buying Steaks */}
                <div className="ranch-item">
                    <img
                        src="/weed.jpg"
                        alt="Alternstive medicine"
                        className="ranch-image"
                    />
                    <button
                        className="ranch-button"
                        onClick={() => handleNavigate("/vacations/ranch/medicine-shop")}
                    >
                        Alternative Medicine
                    </button>
                </div>

                {/* Tour Pass */}
                <div className="ranch-item">
                    <img
                        src="/Rodeo.jpg"
                        alt="Tour Pass"
                        className="ranch-image"
                    />
                    <button className="ranch-button" onClick={handleReservation}>
                        El Rodeo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RanchPage;
