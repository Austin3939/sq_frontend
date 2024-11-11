import React, { useState } from 'react';
import './bookstyles.css';

const SearchBookCard = ({ book, onButtonClick }) => {
  const [expandedBook, setExpandedBook] = useState(null);

  const handleOpenPopup = (book) => {
    setExpandedBook(book);
  };

  const handleClosePopup = () => {
    setExpandedBook(null);
  };

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    onButtonClick(expandedBook, selectedValue);
  };

  return (
    <div className="book-holder">
      <div
        key={book.google_id}
        className="book-card"
        onClick={() => handleOpenPopup(book)} // Open the popup for this book
        style={{ cursor: 'pointer' }}
      >
        <img src={book.cover} alt={book.title} />
      </div>

      {/* Popup Overlay */}
      {expandedBook && (
        <div className="overlay" onClick={handleClosePopup}>
          <div className="book-controls expanded" onClick={(e) => e.stopPropagation()}>
            <div className="search-book-details">
              <h1>{expandedBook.title}</h1>
              <div><img src={book.cover} alt={book.title} /></div>
              <p className="author">{expandedBook.author}</p>
              <p className="author">Pages: {expandedBook.pages}</p>
              <p className="author">
                {expandedBook.publisher} | {expandedBook.publishing_date}
              </p>
            </div>
            <div className="dropdownContainer">
              <select className="dropdown" onChange={handleDropdownChange} defaultValue="">
                <option value="" disabled hidden>Add to Bookshelf</option>
                <option className="book-status tbr" value="5">TBR</option>
                <option className="book-status reading" value="3">Reading</option>
                <option className="book-status read" value="4">Read</option>
                <option className="book-status wishlist" value="">Wishlist</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBookCard;
