import React, { useState } from "react";
import "./ZhanGolfReservationPage.css";

const ZhanGolfReservationPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");

    const handleReservation = (e) => {
        e.preventDefault();

        if (!name || !email || !date) {
            setMessage("Please fill in all fields.");
            return;
        }

        setMessage(`Reservation confirmed for ${name} on ${date}!`);
        setName("");
        setEmail("");
        setDate("");
    };

    return (
        <div className="reservation-page">
            <h1>Zhan's Golf Resort</h1>
            <p>Book your exclusive golf experience at Zhan's Golf Resort!</p>

            {/* Main content container */}
            <div className="content-container">
                {/* Left Section: Pictures and Explanations */}
                <div className="resort-details">
                    <div className="resort-item">
                        <img
                            src="/coach.jpg"
                            alt="Golf Coach"
                            className="resort-image"
                        />
                        <p className="resort-description">
                            Learn from world-class golf coaches to improve your swing.
                        </p>
                    </div>
                    <div className="resort-item">
                        <img
                            src="/images/golf-car.jpg"
                            alt="Golf Car"
                            className="resort-image"
                        />
                        <p className="resort-description">
                            Enjoy a relaxing ride in our premium golf carts.
                        </p>
                    </div>
                    <div className="resort-item">
                        <img
                            src="/images/champagne.jpg"
                            alt="Champagne"
                            className="resort-image"
                        />
                        <p className="resort-description">
                            Celebrate your game with fine champagne at our clubhouse.
                        </p>
                    </div>
                </div>

                {/* Right Section: Reservation Form */}
                <div className="reservation-form-container">
                    <p className="price">Price: $200 per day</p>
                    <form className="reservation-form" onSubmit={handleReservation}>
                        <label>
                            Name:
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </label>
                        <label>
                            Date:
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </label>
                        <button type="submit">Reserve Now</button>
                    </form>

                    {message && <p className="confirmation-message">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default ZhanGolfReservationPage;
