// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ toggleTheme, isDarkMode }) => {
    return (
        <div className="sidebar">
            <h2 style={{marginTop:'0px'}}>Archive</h2>
            <ul>
                <li><Link to="/search-books">Book Search</Link></li>
                <li><Link to="/my-library">My Library</Link></li>
                <li><Link to="/edit-book">editbook</Link></li>
                <li><Link to="/add-book">addbook</Link></li>
                <li><Link to="/FullWidth">FullWidth</Link></li>
                <li><Link to="/TwoColumns">TwoColumns</Link></li>
                {/* Add more links as needed */}
            </ul>
            <button onClick={toggleTheme} style={{ position: 'absolute', bottom: '20px' }}>
                {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
        </div>
    );
};

export default Sidebar;
