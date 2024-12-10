import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChineseRestaurantPage.css";

const ChineseRestaurantPage = () => {
    const [selectedMeal, setSelectedMeal] = useState(null);
    const navigate = useNavigate();

    const meals = [
        {
            id: 1,
            name: "Dim Sum Feast",
            price: 30,
            image: "/dim-sum.jpg",
            description: "Enjoy an assortment of freshly steamed dim sum.",
        },
        {
            id: 2,
            name: "Peking Duck",
            price: 50,
            image: "/peking-duck.jpg",
            description: "Crispy Peking Duck served with pancakes and hoisin sauce.",
        },
        {
            id: 3,
            name: "Hot Pot Experience",
            price: 40,
            image: "/hot-pot.jpg",
            description: "Savor a variety of meats and vegetables in a rich broth.",
        },
        {
            id: 4,
            name: "Orange Chicken",
            price: 20,
            image: "/orange.jpg",
            description: "All time favourite",
        },
    ];

    const handleSelectMeal = (meal) => {
        setSelectedMeal(meal);
    };

    const handlePurchase = () => {
        if (!selectedMeal) {
            alert("Please select a meal plan first.");
            return;
        }

        // Redirect to Checkout page with meal details
        navigate("/checkout", {
            state: {
                name: selectedMeal.name,
                price: selectedMeal.price,
            },
        });
    };

    return (
        <div className="restaurant-container">
            <div className="hero-section">
                <h1>Chef Paul's Chinese Cuisine</h1>
                <p>Experience authentic flavors from Southern California Chinatown.</p>
            </div>

            <div className="meals-section">
                <h2>Select Your Meal Plan</h2>
                <div className="meals-grid">
                    {meals.map((meal) => (
                        <div
                            key={meal.id}
                            className={`meal-card ${selectedMeal?.id === meal.id ? "selected" : ""}`}
                            onClick={() => handleSelectMeal(meal)}
                        >
                            <img src={meal.image} alt={meal.name} className="meal-image" />
                            <h3>{meal.name}</h3>
                            <p>{meal.description}</p>
                            <p className="price">${meal.price}</p>
                        </div>
                    ))}
                </div>
                <button className="purchase-button" onClick={handlePurchase}>
                    Purchase Plan
                </button>
            </div>
        </div>
    );
};

export default ChineseRestaurantPage;
