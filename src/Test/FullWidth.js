import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FullWidth.css';
import Banner from '../components/banner';


const FullWidth = () => {
    //const [data, setBooks] = useState([]);
    //const [error, setError] = useState(false);  // State to track errors

    /*useEffect(() => {
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
    */
    return (
    <div className="pagecontainer">
        <Banner />
        <div className="pageContent">
            <p>This is where the components go!</p>
        </div>
    </div>
    );
};

export default FullWidth;
