import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GunshopPage.css";
import gunshopBanner from "../gunshop-banner.jpg"; // Add a banner image for the gunshop

const GunshopPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    const itemsForSale = [
        {
            id: 1,
            name: "Remington 870",
            price: 150,
            image: "/remington.jpg", // Ensure these images are in the `public/images` folder
            description: "A reliable shotgun, perfect for hunting.",
        },
        {
            id: 2,
            name: "Colt M1911",
            price: 200,
            image: "/colt.jpg",
            description: "A classic handgun for self-defense.",
        },
        {
            id: 3,
            name: "Winchester Model 70",
            price: 300,
            image: "/winchester.jpg",
            description: "A high-precision rifle for experienced shooters.",
        },
        {
            id: 4,
            name: "Glock 19",
            price: 250,
            image: "/glock.jpg",
            description: "Compact pistol, reliable and easy to handle.",
        },
        {
            id: 5,
            name: "Smith & Wesson Model 29",
            price: 350,
            image: "/sw-model29.jpg",
            description: "Powerful revolver with a sleek design.",
        },
        {
            id: 6,
            name: "AR-15",
            price: 450,
            image: "/ar15s.jpg",
            description: "Lightweight and customizable semi-automatic rifle.",
        },
    ];

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleCheckout = () => {
        if (!selectedItem) {
            alert("Please select an item first.");
            return;
        }

        // Navigate to CheckoutForm and pass selected item details as state
        navigate("/checkout", {
            state: {
                name: selectedItem.name,
                price: selectedItem.price,
            },
        });
    };

    return (
        <div className="gunshop-container">
            {/* Hero Section */}
            <div
                className="hero-section"
                style={{
                    backgroundImage: `url(${gunshopBanner})`,
                }}
            >
                <h1>Gunshop at Senor Alejandro's Ranch</h1>
                <p>Select your weapon of choice and gear up for your next adventure.</p>
            </div>

            {/* Items Section */}
            <div className="items-section">
                <h2>Available Items</h2>
                <div className="items-grid">
                    {itemsForSale.map((item) => (
                        <div
                            key={item.id}
                            className={`item-card ${selectedItem?.id === item.id ? "selected" : ""}`}
                            onClick={() => handleSelectItem(item)}
                        >
                            <img src={item.image} alt={item.name} className="item-image" />
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p className="price">${item.price}</p>
                        </div>
                    ))}
                </div>
                <button className="checkout-button" onClick={handleCheckout}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default GunshopPage;
