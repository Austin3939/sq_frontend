import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './booktable.css';

const Bookshelf = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');

    const [showFilters, setShowFilters] = useState(false);
    const filterBooks = (book) => {
        // Filter by start date
        if (startDate && new Date(book.startdate) < new Date(startDate)) return false;

        // Filter by end date
        if (endDate && new Date(book.finishdate) > new Date(endDate)) return false;

        // Filter by author
        if (authorFilter && !book.bookid.author.toLowerCase().includes(authorFilter.toLowerCase())) return false;

        // Filter by rating
        if (ratingFilter && book.rating !== parseInt(ratingFilter)) return false;

        return true;
    };
    
    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
        setAuthorFilter('');
        setRatingFilter('');
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/bookapp/api/userbookdata/', { withCredentials: true });
                setBooks(response.data);
                console.log('Fetched books:', response.data);
            } catch (error) {
                console.error('There was an error fetching the books!', error);
            }
        };

        fetchData();
    }, []); // Runs once when the component mounts

    // Define the handleBookClick function
    const handleBookClick = async (userbookid) => {
        try {
            // Fetch the specific book data based on userbookdataid
            const response = await axios.get('http://127.0.0.1:8000/bookapp/api/userbookdata/', {
                params: { userbookid: userbookid },  // Pass the clicked userbookdataid
                withCredentials: true
            });
            
            console.log('Selected book data:', response.data);

            // Navigate to the UserBookData route and pass the book data
            navigate(`/user-book-data/${userbookid}`, { state: { bookData: response.data } });
        } catch (error) {
            console.error('Error fetching book:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="libraryContainer">
            <button onClick={toggleFilters} className="filterButton">
                Filter {showFilters ? '▲' : '▼'}
            </button>
            {/* Filter Toggle */}
            {showFilters && (
                <div className="filterContainer">
                    <label>
                        Start Date:&nbsp;
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        End Date:&nbsp;
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Author:&nbsp;
                        <input
                            type="text"
                            value={authorFilter}
                            onChange={(e) => setAuthorFilter(e.target.value)}
                            placeholder="Enter author name"
                        />
                    </label>
                    <label>
                        Rating:&nbsp;
                        <input
                            type="number"
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value)}
                            placeholder="1-5"
                            min="0"
                            max="5"
                        />
                    </label>
                    <button className="clearFilter" onClick={clearFilters}>Clear Filters</button>
                </div>
            )}
    
            {/* Filtered Books */}
            <div>
                <div className="bookRow"> {/* Use a single wrapper for the images */}
                {books
                    .filter((book) => filterBooks(book)) // Apply filter function
                    .map((book) => (
                <div key={book.userbookid} className="bookItem" onClick={() => handleBookClick(book.userbookid)}>
                    <img src={book.bookid.cover} alt={book.bookid.title} className="img" />
            </div>
      ))}
  </div>
</div>

        </div>
    );
    
};

export default Bookshelf;
