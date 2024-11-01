import './App.css';

import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import HomePage from './component/home/HomePage';
import ProfilePage from "./component/profile/ProfilePage";
import RoomBooking from "./component/room booking/roombook";

function App() {
    // Create a ref for the homepage section
    const homeRef = useRef(null);

    // Function to scroll to the homepage section
    const scrollToHome = () => {
        if (homeRef.current) {
            homeRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <BrowserRouter>
            <div className="App">
                {/* Pass scrollToHome as a prop to Navbar */}
                <Navbar onHomeClick={scrollToHome} />

                {/* Hero Section */}
                <div className="hero-image">
                    <div className="hero-overlay">
                        <div className="hero-text">Hotel Los Terrenos</div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="content" ref={homeRef}>
                    <Routes>
                        <Route exact path='/home' element={<HomePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/roombook" element={<RoomBooking />} />
                    </Routes>
                </div>

                <FooterComponent />
            </div>
        </BrowserRouter>
    );
}

export default App;