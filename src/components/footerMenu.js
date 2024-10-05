import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHome, faSearch, faBook, faLayerGroup, faUser } from '@fortawesome/free-solid-svg-icons';
import './footerMenu.css';  

const FooterMenu = () => {
    return (
        <footer className="footer">
          <Link to="/" className="footer-button">
            <FontAwesomeIcon icon={faHome} className="icon" />
            <span>Home</span>
          </Link>
          <Link to="/search-books" className="footer-button">
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <span>Search</span>
          </Link>
          <Link to="/my-library" className="footer-button">
            <FontAwesomeIcon icon={faBook} className="icon" />
            <span>Library</span>
          </Link>
          <Link to="/booksehlf" className="footer-button">
            <FontAwesomeIcon icon={faLayerGroup} className="icon" />
            <span>Bookshelf</span>
          </Link>
          <Link to="/profile" className="footer-button">
            <FontAwesomeIcon icon={faUser} className="icon" />
            <span>Profile</span>
          </Link>
        </footer>
      );
    };

export default FooterMenu;
