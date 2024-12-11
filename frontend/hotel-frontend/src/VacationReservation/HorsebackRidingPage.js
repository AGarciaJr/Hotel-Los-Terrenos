import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HorsebackRidingPage.css";
import horsebackRidingBanner from "../horseback-riding-banner.jpg";

const HorsebackRidingPage = () => {
    const [selectedHorse, setSelectedHorse] = useState(null);
    const navigate = useNavigate();

    const horses = [
        {
            id: 1,
            name: "Missouri Fox Trotter",
            price: 100,
            image: "/mft.jpg", // Ensure these images are in the `public/images` folder
            description: "Very comfort for riding, and best for hunting",
        },
        {
            id: 2,
            name: "Tennessee Walking Horse",
            price: 100,
            image: "/walking.jpg",
            description: "A gentle horse, perfect for beginners.",
        },
        {
            id: 3,
            name: " Texas Quarter",
            price: 200,
            image: "/Quarter.jpeg",
            description: "A spirited horse for experienced riders..",
        },
    ];

    const handleSelectHorse = (horse) => {
        setSelectedHorse(horse);
    };

    const handlePayment = () => {
        if (!selectedHorse) {
            alert("Please select a horse first.");
            return;
        }

        // Navigate to CheckoutForm and pass selectedHorse details as state
        navigate("/checkout", {
            state: {
                name: selectedHorse.name,
                price: selectedHorse.price,
            },
        });
    };

    return (
        <div className="horseback-container">
            {/* Hero Section */}
            <div
                className="hero-section"
                style={{
                    backgroundImage: `url(${horsebackRidingBanner})`,
                }}
            >
                <h1>Horseback Riding at Senor Alejandro's Ranch</h1>
                <p>Choose your horse, enjoy the ride, and make unforgettable memories.</p>
            </div>

            {/* Horse Selection Section */}
            <div className="horses-section">
                <h2>Select Your Horse</h2>
                <div className="horses-grid">
                    {horses.map((horse) => (
                        <div
                            key={horse.id}
                            className={`horse-card ${selectedHorse?.id === horse.id ? "selected" : ""}`}
                            onClick={() => handleSelectHorse(horse)}
                        >
                            <img src={horse.image} alt={horse.name} className="horse-image" />
                            <h3>{horse.name}</h3>
                            <p>{horse.description}</p>
                            <p className="price">${horse.price}</p>
                        </div>
                    ))}
                </div>
                <button className="pay-button" onClick={handlePayment}>
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default HorsebackRidingPage;
