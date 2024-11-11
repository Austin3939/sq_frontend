import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faFileInvoice, faSearch, faBook, faLayerGroup, faUser } from '@fortawesome/free-solid-svg-icons';
import './webstyles.css';

const FooterMenu = () => {
    return (
        <footer className="footer">
          <Link to="/search-books" className="footer-button">
            <FontAwesomeIcon icon={faSearch} className="icon" />
            <span>Search</span>
          </Link>
          <Link to="/" className="footer-button">
            <FontAwesomeIcon icon={faFileInvoice} className="icon" />
            <span>Notebook</span>
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
