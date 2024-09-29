import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './booktable.css';

const Bookshelf = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

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
    const handleBookClick = async (userbookdataid) => {
        try {
            // Fetch the specific book data based on userbookdataid
            const response = await axios.get('http://127.0.0.1:8000/bookapp/api/userbooks/', {
                params: { bookid: userbookdataid },  // Pass the clicked userbookdataid
                withCredentials: true
            });
            
            console.log('Selected book data:', response.data);

            // Navigate to the UserBookData route and pass the book data
            navigate('/user-book-data', { state: { bookData: response.data } });
        } catch (error) {
            console.error('Error fetching book:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Book</th>
                        <th className="th">Title</th>
                        <th className="th">Author</th>
                        <th className="th">Publishing Date</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.userbookdataid} onClick={() => handleBookClick(book.userbookdataid)}>
                            <td className="td">
                                <img src={book.bookid.cover} alt={book.bookid.title} className="img" />
                            </td>
                            <td className="td">{book.bookid.title}</td>
                            <td className="td">{book.bookid.author}</td>
                            <td className="td">{book.bookid.publishingdate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Bookshelf;
