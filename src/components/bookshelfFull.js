import React from 'react';
import './bookshelfFull.css';

const BookshelfFull = ({ data }) => {
    return (
        <div className="bookshelfContainer">
            <div className="bookshelfTable">
                {data.map(book => (
                    <div key={book.userbookdataid} className="bookHolder">
                        <img src={book.bookid.cover} alt={book.bookid.title} />
                        <div>
                            <h2>{book.bookid.title}</h2>
                            <p>{book.bookid.author}</p>
                            <p>{book.bookid.publishingdate}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookshelfFull;
