import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import ReservationPage from "./pages/ReservationPage";
import FindReservationPage from "./pages/FindReservationPage";
import LoginPage from "./pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/RegisterPage";
import ProfilePage from "./pages/common/ProfilePage";
import ClerkPage from "./pages/clerk/ClerkPage";
import EditRoomPage from "./pages/clerk/EditRoomPage";
import AdminPage from "./pages/admin/AdminPage";
import RoomsPage from "./pages/rooms/RoomsPage";
import CancelReservationPage from "./pages/common/CancelReservationPage"; //Victor working on cancellation

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/reserve-room/:roomId" element={<ReservationPage />} />
                <Route path="/find-reservation" element={<FindReservationPage />} />

                <Route path="/profile/:userId" element={<ProfilePage />}/>
                <Route path="/profile" element={<ProfilePage />}/>

                <Route path="/clerk" element={<ClerkPage />} />
                <Route path="/clerk/edit-room/:roomId" element={<EditRoomPage />} />
                <Route path="/clerk/reserve-room/:roomId/:userId" element={<ReservationPage />} />


                <Route path="/admin" element={<AdminPage />} />/

                <Route path="/rooms/:floorId" element={<RoomsPage />} />
                <Route path="/cancel-reservation/:reservationId" element={<CancelReservationPage />} />
            </Routes>
        </Router>
    );
};

export default App;
