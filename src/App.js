// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Bookshelf from './components/bookshelf';
import PersonPortal from './components/PersonPortal';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/bookshelf" element={<Bookshelf />} />
                <Route path="/person-portal" element={<PersonPortal />} />
            </Routes>
        </Router>
    );
}

export default App;



