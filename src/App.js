import React, { useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Web/Sidebar';
import Mylibrary from './pages/NEWPages/LibraryPage';
import Bookshelf from './pages/bookshelves/bookshelf';
import SearchBooks from './pages/SearchBooks/searchbooks';
import EditBook from './pages/bookshelves/editbook';
import AddBook from './pages/bookshelves/addbook';
import UserBookData from './pages/bookdata/userbookdata';
import FullWidth from './Test/FullWidth';
import FooterMenu from './components/Web/footerMenu';
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
            <div>
                {/* <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{ minHeight: '100vh' }}>
                <button className="hamburger-icon" onClick={toggleSidebar}>
                    &#9776;
                </button>
                {sidebarVisible && (
                    <Sidebar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                )}*/}
                <div className="content app-content">
                    <Routes>
                        <Route path="/my-library" element={<Mylibrary />} />
                        <Route path="/booksehlf" element={<Bookshelf />} />
                        <Route path="/search-books" element={<SearchBooks />} />
                        <Route path="/edit-book" element={<EditBook />} />
                        <Route path="/add-book" element={<AddBook />} />
                        <Route path="/user-book-data/:userbookid" element={<UserBookData />} />
                        <Route path="/FullWidth" element={<FullWidth />} />
                        <Route path="/move-book/:userbookid" element={<Bookshelf />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
                <FooterMenu />
            </div>
        </Router>
    );
};

export default App;




