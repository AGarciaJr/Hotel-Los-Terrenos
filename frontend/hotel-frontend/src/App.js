import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ReservationPage from "./pages/ReservationPage";
import FindReservationPage from "./pages/FindReservationPage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="room-details/:roomId" element={<ReservationPage />} />
                <Route path="find-reservation" element={<FindReservationPage />} />
            </Routes>
        </Router>
    );
};

export default App;
