import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './searchbooks.css';
import SearchBookCard from '../../components/Books/SearchBookCard'; 

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/bookapp/api/SearchBooks/', {
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
      bookshelfid: bookshelf,
    };

    console.log('Data being sent:', data); // Log the data to inspect it
    try {
      const response = await axios.post('http://127.0.0.1:8000/bookapp/api/add-book-view/', data, {
        headers: {},
        withCredentials: true,
      });
      console.log('Book saved:', response.data);
    } catch (error) {
      console.error('There was an error saving the book!', error);
      alert('Book failed to be added to bookshelf!');
    }
  };

  return (
    <div>
      <div className="search-div">
        <h2>Search Books</h2>
        <input
          className="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
        />
      </div>
      <div className="bookcard-div">
        {/* Pass each book to the SearchBookCard component */}
        {books.map((book) => (
          <SearchBookCard
            key={book.google_id}
            book={book} // Pass book data to the card
            onButtonClick={handleButtonClick} // Pass the button click handler
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
