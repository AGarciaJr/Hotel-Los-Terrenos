import './App.css';

import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import HomePage from './component/home/HomePage';

function App() {
  return (
      <BrowserRoute>
        <div className="App">
          <Navbar/>
          <div className='content'>
            <Routes>
              <Route exact path='/home' element={<HomePage/>}/>
            </Routes>
          </div>
          <FooterComponent/>
        </div>
      </BrowserRoute>
  );
}

export default App;
