import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './searchbooks.css';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

const SearchBooks = () => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/bookapp/api/searchbooks/`, {
                    params: { query },
                });
                setBooks(response.data);
            } catch (error) {
                console.error('There was an error fetching the books!', error);
            }
        };

        if (query) {
            fetchBooks();
        }
    }, [query]);

    const handleButtonClick = async (book, bookshelf) => {
        const data = {
            googleid: book.google_id,
            title: book.title,
            author: book.author,
            cover: book.cover,
            publisher: book.publisher,
            publishingdate: book.publishing_date,
            genre: book.categories,
            pages: book.pages,
            bookshelfid: bookshelf
        };
        console.log('Data being sent:', data); // Log the data to inspect it
        try {
            const response = await axios.post('http://127.0.0.1:8000/bookapp/api/add-book-view/', data, {
                headers: {
                },
                withCredentials: true,
            });
            console.log('Book saved:', response.data);
        } catch (error) {
            console.error('There was an error saving the book!', error);
        }
    };

    return (
    <div className="pagecontainer">
        <h2>Search Books</h2>
            <input className="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books..."
            />
        <div className="bookContent">
            {books.map((book) => (
            <div key={book.google_id} className="bookdiv">
                    <img src={book.cover} alt={book.title} className="img" />
                    <div className="bookDetails">
                        <h2 className="title">{book.title}</h2>
                        <p className="author">{book.author}</p>
                        <p className="author">Pages: {book.pages}</p>
                        <p className="author">{book.publisher} | {book.publishing_date}</p>
                    </div>
                    <div className="buttonContainer">
                        <button
                            className="button"
                            onClick={() => handleButtonClick(book, '6')}>
                            Read
                        </button>
                        <button
                            className="button"
                            onClick={() => handleButtonClick(book, '5')}>
                            TBR
                        </button>
                        <button
                            className="button"
                            onClick={() => handleButtonClick(book, '7')}>
                            Wishlist
                        </button>
                    </div>
                </div>
        ))}
        </div>
    </div>
    );
};

export default SearchBooks;
