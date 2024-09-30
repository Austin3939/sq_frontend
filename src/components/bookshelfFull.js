import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import necessary hooks
import './bookshelfFull.css';

const BookshelfFull = ({ data }) => {
    const [bookshelves, setBookshelves] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [selectedBookshelf, setSelectedBookshelf] = useState({});
    const { userbookid } = useParams(); // Get userbookid from the route params
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Fetch bookshelves when the component mounts
        axios.get('http://127.0.0.1:8000/bookapp/api/userbooks/', { withCredentials: true })
            .then(response => {
                console.log(response.data); // Log to check the structure
                const uniqueBookshelvesMap = {};
                response.data.forEach(item => {
                    const bookshelfId = item.bookshelfid.bookshelfid;
                    if (!uniqueBookshelvesMap[bookshelfId]) {
                        uniqueBookshelvesMap[bookshelfId] = {
                            bookshelfid: bookshelfId,
                            name: item.bookshelfid.name,
                        };
                    }
                });

                const uniqueBookshelves = Object.values(uniqueBookshelvesMap);
                setBookshelves(uniqueBookshelves);
            })
            .catch(error => console.log(error));
    }, []);

    const handleDelete = async (userbookid) => {
        try {
            const response = await fetch(`http://localhost:8000/bookapp/api/delete-book/${userbookid}/`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the book');
            }
    
            console.log('Book deleted successfully');
            // You may want to remove the book from state after successful deletion.
            // Consider filtering out the deleted book from the data state.
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleChangeBookshelf = async (userbookid, bookshelfid) => {
        console.log('Attempting to move book with ID:', userbookid, 'to bookshelf ID:', bookshelfid);
        
        try {
            const response = await fetch(`http://localhost:8000/bookapp/api/userbooks/${userbookid}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookshelfid }),
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to move the book:', errorData);
                throw new Error('Failed to move the book');
            }
        
            console.log('Book moved successfully');
            setSelectedBookshelf(prev => ({ ...prev, [userbookid]: bookshelfid }));
        } catch (error) {
            console.error('Error moving book:', error);
        }
    };
    
    return (
        <div className="bookshelfContainer">
            <div className="bookshelfTable">
                {data.map(book => (
                    <div key={book.userbookid} className="bookHolder">
                        <img src={book.bookid.cover} alt={book.bookid.title} />
                        <div>
                            <h2>{book.bookid.title}</h2>
                            <p>{book.bookid.author}</p>
                            {book.startdate && <p>Start Date: {book.startdate}</p>}
                            {book.finishdate && <p>Finish Date: {book.finishdate}</p>}
                            {book.rating && <p>Rating: {book.rating}</p>}
                        </div>
                        <div className="dot-menu">
                            <button
                                className="dot-button"
                                onClick={() => setDropdownOpen(dropdownOpen === book.userbookid ? null : book.userbookid)}
                            >
                                •
                            </button>
                            {dropdownOpen === book.userbookid && (
                                <div className="dropdown-menu active">
                                    <select
                                        value={selectedBookshelf[book.userbookid] || book.bookshelfid.bookshelfid} // Default to the current bookshelf
                                        onChange={(e) => {
                                            const newBookshelfId = e.target.value;
                                            handleChangeBookshelf(book.userbookid, newBookshelfId); // Call to change the bookshelf
                                        }}
                                    >
                                        {bookshelves.map(bookshelf => (
                                            <option key={bookshelf.bookshelfid} value={bookshelf.bookshelfid}>
                                                {bookshelf.name}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={() => handleDelete(book.userbookid)}>Delete Book</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookshelfFull;
