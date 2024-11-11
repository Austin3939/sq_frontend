import React, { useState } from 'react';
import './bookstyles.css';

const BookCard = ({ data, filterBooks, onBookClick }) => {
  const [expandedBook, setExpandedBook] = useState(null);

  const handleOpenPopup = (book) => {
    setExpandedBook(book);
  };

  const handleClosePopup = () => {
    setExpandedBook(null);
  };

  const sortedAndFilteredBooks = data
    .sort((a, b) => new Date(b.dateadded) - new Date(a.dateadded))
    .filter(filterBooks)
    .map((book) => (
      <div
        key={book.userbookid}
        className="book-holder"
        onClick={() => {
          if (onBookClick) onBookClick(book.userbookid);
          handleOpenPopup(book);
        }}
        style={{ cursor: 'pointer' }}
      >
        <img src={book.bookid.cover} alt={book.bookid.title} />
      </div>
    ));

  return (
    <div className="bookcard-div">
      {sortedAndFilteredBooks}
      
      {/* Popup Overlay */}
      {expandedBook && (
        <div className="overlay" onClick={handleClosePopup}>
          <div className="book-controls expanded" onClick={(e) => e.stopPropagation()}>
            <div className={`book-status ${expandedBook.bookshelfid.name.toLowerCase()}`}>
              <h6>{expandedBook.bookshelfid.name}</h6>
            </div>
            <div className="book-details">
              <h2>{expandedBook.bookid.title}</h2>
              {expandedBook.bookid.author} <br></br>
               Publishing Date: {expandedBook.bookid.publishingdate} <br></br>
               Pages: {expandedBook.bookid.pages} <br></br>
               Genre: {expandedBook.bookid.genre} <br></br>
              <div className="userdata-info">
                {expandedBook.startdate && <p>Start Date: {expandedBook.startdate}</p>}
                {expandedBook.finishdate && <p>Finish Date: {expandedBook.finishdate}</p>}
                {expandedBook.rating && <p>Rating: {expandedBook.rating}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;



