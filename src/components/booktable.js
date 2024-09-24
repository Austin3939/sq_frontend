import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './booktable.css';

const Bookshelf = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/bookapp/api/userbookdata/`, { withCredentials: true });
                setBooks(response.data);
                console.log('Fetched books:', response.data);
            } catch (error) {
                console.error('There was an error fetching the books!', error);

            }
        };

        fetchData();
    }, []); // Ensure this array is empty to run only once on component mount

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
                <tr key={book.userbookdataid}>
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
