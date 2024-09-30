import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Mylibrary from './pages/mylibrary/mylibrary';
import Bookshelf from './pages/bookshelves/bookshelf';
import SearchBooks from './pages/searchbooks/searchbooks';
import EditBook from './pages/bookshelves/editbook';
import AddBook from './pages/bookshelves/addbook';
import UserBookData from './pages/bookdata/userbookdata';
import FullWidth from './Test/FullWidth';
import TwoColumns from './Test/TwoColumns';
import './App.css';



const App = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    
    return (
        <Router>
            <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{ minHeight: '100vh' }}>
                <button className="hamburger-icon" onClick={toggleSidebar}>
                    &#9776;
                </button>
                {sidebarVisible && (
                    <Sidebar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                )}
                <div className="content" style={{ marginLeft: sidebarVisible ? '200px' : '80px' }}>
                    <Routes>
                        <Route path="/my-library" element={<Mylibrary />} />
                        <Route path="/booksehlf" element={<Bookshelf />} />
                        <Route path="/search-books" element={<SearchBooks />} />
                        <Route path="/edit-book" element={<EditBook />} />
                        <Route path="/add-book" element={<AddBook />} />
                        <Route path="/user-book-data/:userbookid" element={<UserBookData />} />
                        <Route path="/FullWidth" element={<FullWidth />} />
                        <Route path="/TwoColumns" element={<TwoColumns />} />
                        <Route path="/move-book/:userbookid" element={<Bookshelf />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;




