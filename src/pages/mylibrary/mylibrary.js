import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookTable from '../../components/booktable';
import HeaderContent from '../../components/headercontent';
import '../../Test/FullWidth.css';

const MyLibrary = () => {
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
        <div>
            <HeaderContent />
        </div>
        <h1>My Library</h1>
        <div className="pageContent">
            <BookTable />
        </div>
    </div>
    );
};

export default MyLibrary;
