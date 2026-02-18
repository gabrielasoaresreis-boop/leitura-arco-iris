import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './ScrollToTop.jsx';
import LandingPage from './LandingPage.jsx';
import Checkout from './Checkout.jsx';
import ThankYou from './ThankYou.jsx';


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
