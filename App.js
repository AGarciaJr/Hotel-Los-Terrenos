import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StripeContainer from './components/Stripe';
import RefundPage from './components/RefundPage';

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Hotel Los Terrenos</h1>
                    <nav>
                        <Link to="/">Payment</Link> | <Link to="/refund">Refund</Link>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<StripeContainer />} />
                        <Route path="/refund" element={<RefundPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

