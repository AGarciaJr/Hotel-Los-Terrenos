import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MedicineShopPage.css";
import medicineShopBanner from "../medicine-shop-banner.jpg"; // Add a banner image for the medicine shop

const MedicineShopPage = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    const itemsForSale = [
        {
            id: 1,
            name: "CBD Oil",
            price: 50,
            image: "/cbd-oil.jpg", // Ensure these images are in the `public/images` folder
            description: "Natural oil for relaxation and stress relief.",
        },
        {
            id: 2,
            name: "CBD Cookie",
            price: 20,
            image: "/cbd-cookie.jpg",
            description: "Soothing herbal tea for better sleep.",
        },
        {
            id: 3,
            name: "CBD Gum",
            price: 30,
            image: "/cbd-gum.jpg",
            description: "Aromatic oils to uplift your mood.",
        },
        {
            id: 4,
            name: "CBD Brownie",
            price: 25,
            image: "/cbd-brownie.jpg",
            description: "Pure organic honey for your immune system.",
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
        <div className="medicine-shop-container">
            {/* Hero Section */}
            <div
                className="hero-section"
                style={{
                    backgroundImage: `url(${medicineShopBanner})`,
                }}
            >
                <h1>Medicine Shop at Senor Alejandro's Ranch</h1>
                <p>Explore our natural remedies for a healthier life.</p>
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

export default MedicineShopPage;
