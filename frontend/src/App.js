import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './component/common/Navbar';
import FooterComponent from './component/common/Footer';
import HomePage from './component/home/HomePage';
import AllRoomsPage from './component/reserving_rooms/AllRoomsPage';
import FindReservationPage from './component/reserving_rooms/FindReservationPage';
import RoomDetailsPage from './component/reserving_rooms/RoomDetailsPage';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <div className='content'>
            <Routes>
              <Route exact path='/home' element={<HomePage/>}/>
              <Route exact path='/rooms' element={<AllRoomsPage/>}/>
              <Route path='/find-booking' element={<FindReservationPage/>}/>
              <Route path='/room-details-book/:roomId' element={<RoomDetailsPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>
              <Route apath='/profile' element={<ProfilePage/>}/>
              <Route apath='/edit-profile' element={<EditProfilePage/>}/>
            </Routes>
          </div>
          <FooterComponent/>
        </div>
      </BrowserRouter>
  );
}

export default App;
