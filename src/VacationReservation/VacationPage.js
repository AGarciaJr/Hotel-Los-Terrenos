import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VacationPage.css';

const VacationPage = () => {
    const navigate = useNavigate();

    const handleVacationClick = (path) => {
        navigate(path);
    };

    return (
        <div className="vacation-container">
            <h1>Choose Your Vacation Package</h1>
            <div className="vacation-buttons">
                <div className="vacation-item" onClick={() => handleVacationClick("/vacations/zhan-golf")}>
                    <img src="zhan-golf.jpeg" alt="Zhan's Golf Resort" className="vacation-image" />
                    <button className="vacation-button">Zhan's Golf Resort</button>
                </div>
                <div className="vacation-item" onClick={() => handleVacationClick("/vacations/victor-roof")}>
                    <img src="victor-roof.jpg" alt="DJ. Victor's Roof Club" className="vacation-image" />
                    <button className="vacation-button">DJ. Victor's Roof Club</button>
                </div>
                <div className="vacation-item" onClick={() => handleVacationClick("/vacations/alejandro-ranch")}>
                    <img src="alejandro-ranch.jpg" alt="Senor Alejandro's Ranch" className="vacation-image" />
                    <button className="vacation-button">Senor Alejandro's Ranch</button>
                </div>
                <div className="vacation-item" onClick={() => handleVacationClick("/vacations/chef-paul")}>
                    <img src="chef-paul.jpg" alt="Chef Paul's Chinese Cuisine" className="vacation-image" />
                    <button className="vacation-button">Chef Paul's Chinese Cuisine</button>
                </div>
                <div className="vacation-item" onClick={() => handleVacationClick("/vacations/lamar-casino")}>
                    <img src="lamar-casino.jpeg" alt="Dr. Lamar's Casino" className="vacation-image" />
                    <button className="vacation-button">Dr. Lamar's Casino</button>
                </div>
            </div>
        </div>
    );
};

export default VacationPage;
