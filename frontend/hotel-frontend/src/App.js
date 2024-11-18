import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import LoginPage from './component/authentication/LoginPage';
import RegisterPage from './component/authentication/RegisterPage';
import HomePage from './component/home/HomePage';
import AllRoomsPage from './component/reservation/AllRoomsPage';
import RoomDetailsPage from './component/reservation/RoomDetailsPage';
import FindReservationPage from './component/reservation/FindReservationPage';
import GuestProfilePage from './component/guest/GuestProfilePage';
import ClerkPage from './component/clerk/ClerkPage';
import EditRoomPage from './component/clerk/EditRoomPage';
import AddRoomPage from './component/clerk/AddRoomPage';
import AdminPage from './component/admin/AdminPage';
import UpdatePasswordPage from './component/admin/UpdatePasswordPage';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />

                {/* Hero Section */}
                <div className="hero-image">
                    <div className="hero-overlay">
                        <div className="hero-text">Welcome to Hotel Los Terrenos</div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/rooms" element={<AllRoomsPage />} />
                        <Route path="/room-details/roomId" element={<RoomDetailsPage />} />
                        <Route path="/find-reservation" element={<FindReservationPage />} />

                        <Route path="/profile" element={< GuestProfilePage />}/>

                        <Route path="/clerk" element={< ClerkPage/>} />
                        <Route path="/clerk/edit-room" element={<EditRoomPage />} />
                        <Route path="/clerk/add-room" element={<AddRoomPage />} />

                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/admin/create-clerk" element={<RegisterPage/>}/>
                        <Route path="/admin/update-password" element={<UpdatePasswordPage/>}/>


                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<Navigate to="/" />} /> {/* Redirects invalid paths to HomePage */}
                    </Routes>
                </div>

                <FooterComponent />
            </div>
        </BrowserRouter>
    );
}

export default App;
