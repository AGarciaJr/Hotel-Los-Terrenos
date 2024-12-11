import './App.css';
import ListRoomComponent from "./components/ListRoomComponent.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomComponent from "./components/RoomComponent.jsx";
import AdminUserComponent from './components/AdminUserComponent';
import LandingPage from './components/LandingPage';
import ListUsersComponent from './components/ListUsersComponent';
import ReservationComponent from './components/ReservationComponent';
import ReservationConfirmation from './components/ReservationConfirmation';

function App() {
    return (
        <BrowserRouter>
            <HeaderComponent />
            <Routes>
                {/* Existing routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path='/rooms' element={<ListRoomComponent />} />
                <Route path='/add-room' element={<RoomComponent />} />
                <Route path='edit-room/:id' element={<RoomComponent />} />
                <Route path='/users' element={<ListUsersComponent />} />
                <Route path='/add-user' element={<AdminUserComponent />} />
                <Route path="/edit-user/:id" element={<AdminUserComponent />} />

                {/* New routes for reservation system */}
                <Route path="/make-reservation/:roomId" element={<ReservationComponent />} />
                <Route path="/reservation-confirmation" element={<ReservationConfirmation />} />
            </Routes>
            <FooterComponent />
        </BrowserRouter>
    );
}

export default App;