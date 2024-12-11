import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClubPage.css";

const ClubPage = () => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const navigate = useNavigate();

    const tickets = [
        {
            id: 1,
            name: "Standard Entry",
            price: 20,
            description: "General entry to the club for one person.",
            image: "/club-standard.jpg",
        },
        {
            id: 2,
            name: "VIP Entry",
            price: 50,
            description: "Skip the line and access the VIP lounge.",
            image: "/club-vip.jpg",
        },
        {
            id: 3,
            name: "Group Package",
            price: 80,
            description: "Entry for up to 4 guests with a reserved table.",
            image: "/club-group.jpg",
        },
    ];

    const handleSelectTicket = (ticket) => {
        setSelectedTicket(ticket);
    };

    const handlePurchase = () => {
        if (!selectedTicket) {
            alert("Please select a ticket type first.");
            return;
        }

        // Redirect to Checkout page with ticket details
        navigate("/checkout", {
            state: {
                name: selectedTicket.name,
                price: selectedTicket.price,
            },
        });
    };

    return (
        <div className="club-container">
            <div className="hero-section">
                <h1>DJ Victor's Roof Club</h1>
                <p>Join us for an unforgettable night of music, dance, and entertainment.</p>
            </div>

            <div className="tickets-section">
                <h2>Select Your Ticket</h2>
                <div className="tickets-grid">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className={`ticket-card ${selectedTicket?.id === ticket.id ? "selected" : ""}`}
                            onClick={() => handleSelectTicket(ticket)}
                        >
                            <img src={ticket.image} alt={ticket.name} className="ticket-image" />
                            <h3>{ticket.name}</h3>
                            <p>{ticket.description}</p>
                            <p className="price">${ticket.price}</p>
                        </div>
                    ))}
                </div>
                <button className="purchase-button" onClick={handlePurchase}>
                    Buy Ticket
                </button>
            </div>
        </div>
    );
};

export default ClubPage;
