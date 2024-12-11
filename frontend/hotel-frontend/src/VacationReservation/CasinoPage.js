import React from "react";
import { useNavigate } from "react-router-dom";
import "./CasinoPage.css";

const CasinoPage = () => {
    const navigate = useNavigate();

    const handlePokerGame = () => {
        window.open("https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiC6eb1zZ2KAxXSiMIIHZslMBcYABABGgJqZg&ae=2&aspm=1&co=1&ase=5&gclid=CjwKCAiA6t-6BhA3EiwAltRFGPaolnly1p2LqruQYiOu6NdvZtimfLe6sLogNCAtTd9p8NR5iR81LRoCMAsQAvD_BwE&ohost=www.google.com&cid=CAESVuD2rzzlQzfvL1JvGmoV30E75tPHG0HaANyF0F0X8RI5_4bTWnVRdcDLqrlsuAZQYL4Xv8CoVtMxY2YchqTMXjAMRkcmCfF-Pe4Jz9y1x9EMSaDsQ7ji&sig=AOD64_3HtlR1mxONwqL_mvqOhMWsboVGHg&q&adurl&ved=2ahUKEwiTq-H1zZ2KAxWnHNAFHSE7GAIQ0Qx6BAgOEAE", "_blank"); // Replace with your online poker game URL
    };

    const handleReservation = () => {
        navigate("/vacations/casino/reservation"); // Navigate to the reservation page
    };

    return (
        <div className="casino-container">
            <div className="hero-section">
                <h1>Dr. Lamar's Casino</h1>
                <p>Experience the thrill of high-stakes gaming and luxurious entertainment.</p>
            </div>

            <div className="casino-options">
                <div className="casino-item">
                    <img
                        src="/casino-roulette.jpg"
                        alt="Texas Hold'em Table"
                        className="casino-image"
                    />
                    <p>Test your luck at our Texas Hold'Em tables.</p>
                </div>
                <div className="casino-item">
                    <img
                        src="/casino-blackjack.jpg"
                        alt="Blackjack Table"
                        className="casino-image"
                    />
                    <p>Join a game of skill and chance at our exciting blackjack tables.</p>
                </div>
                <div className="casino-item">
                    <img
                        src="/casino-poker.jpeg"
                        alt="Online Poker"
                        className="casino-image"
                    />
                    <button className="casino-button" onClick={handlePokerGame}>
                        Play Online Poker
                    </button>
                </div>
                <div className="casino-item">
                    <img
                        src="/casino-vip.jpg"
                        alt="VIP Lounge"
                        className="casino-image"
                    />
                    <p>Reserve a VIP experience with exclusive perks and services.</p>
                    <button className="casino-button" onClick={handleReservation}>
                        Reserve Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CasinoPage;
