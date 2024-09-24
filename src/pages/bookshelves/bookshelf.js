import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookshelfFull from '../../components/bookshelfFull';
import '../../Test/FullWidth.css';

const Bookshelf = () => {
    const [data, setBooks] = useState([]);
    const [error, setError] = useState(false);  // State to track errors

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/bookapp/api/userbookdata/`, { withCredentials: true });
                setBooks(response.data);
                console.log('Fetched books:', response.data);
            } catch (error) {
                console.error('There was an error fetching the books!', error);
                setError(true);  // Set error state to true if there's an error
            }
        };

        fetchData();
    }, []);

    return (
        <div className="pagecontainer">
            <h1>Bookshelf</h1>
            <div className="pageContent">
                {/* Show error message if there is an error */}
                {error ? (
                    <p>There was an error fetching the books.</p>
                ) : (
                    // Pass the fetched data to BookshelfFull
                    <BookshelfFull data={data} />
                )}
            </div>
        </div>
    );
};

export default Bookshelf;
