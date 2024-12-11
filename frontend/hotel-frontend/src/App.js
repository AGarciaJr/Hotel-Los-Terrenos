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
import ResetUserPage from "./pages/Admin/ResetUserPage";
import AdminPage from "./pages/Admin/AdminPage";
import RoomsPage from "./pages/rooms/RoomsPage";
import VacationPage from "./VacationReservation/VacationPage";
import ZhanGolfReservationPage from "./VacationReservation/ZhanGolfReservationPage";
import RanchPage from "./VacationReservation/RanchPage";
import HorsebackRidingPage from "./VacationReservation/HorsebackRidingPage";
import CheckoutForm from "./stripe/CheckoutForm";
import RefundPage from "./stripe/RefundPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import GunshopPage from "./VacationReservation/GunshopPage";
import MedicineShopPage from "./VacationReservation/MedicineShopPage";
import ChineseRestaurantPage from "./VacationReservation/ChineseRestaurantPage";
import ClubPage from "./VacationReservation/ClubPage";
import CasinoPage from "./VacationReservation/CasinoPage";

const PUBLIC_KEY = 'pk_test_51QTVpLBe3gWPFy5sOMYdWqktgczbyXfzS5u9zDAHTSYiWtBF0rqLstSTvob5JmCWmqmGRt5ZloHWZRQzkWRgnMe800LK84IdcO';
const stripePromise = loadStripe(PUBLIC_KEY);

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

                <Route path={"/reset"} element={<ResetUserPage />} />

                <Route path="/admin" element={<AdminPage />} />/
                <Route path="/admin/resetuser" element={<ResetUserPage />} />/

                <Route path="/rooms/:floorId" element={<RoomsPage />} />

                {/* Vacation Pages */}
                <Route path="/vacations" element={<VacationPage />} />
                <Route path="/vacations/zhan-golf" element={<ZhanGolfReservationPage />} />
                <Route path="/vacations/alejandro-ranch" element={<RanchPage />} />
                <Route path="/vacations/ranch/horseback-riding" element={<HorsebackRidingPage />} />
                <Route path="/vacations/ranch/gunshop" element={<GunshopPage />} />
                <Route path="/vacations/ranch/medicine-shop" element={<MedicineShopPage />} />
                <Route
                    path="/vacations/chinese-restaurant"
                    element={<ChineseRestaurantPage />}
                />
                <Route path="/vacations/casino" element={<CasinoPage />} />
                <Route path="/vacations/club" element={<ClubPage />} />
                {/* Payment and Refund Pages */}
                <Route
                    path="/checkout"
                    element={
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    }
                />
                <Route path="/refund" element={<RefundPage />} />

            </Routes>
        </Router>
    );
};

export default App;
