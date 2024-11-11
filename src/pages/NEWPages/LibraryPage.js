import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderContent from '../../components/Web/headercontent';
import { useNavigate } from 'react-router-dom';
import BookCard from '../../components/books/bookcard';
import './LibraryPage.css';

const Books = () => {
    const [books, setBooks] = useState([]); // Removed TypeScript annotation
    const [loading, setLoading] = useState(true); // Removed TypeScript annotation
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/bookapp/api/userbookdata/', { withCredentials: true });
                setBooks(response.data);
                console.log('Fetched books:', response.data);
            } catch (error) {
                console.error('There was an error fetching the books!', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleBookClick = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    return (
        <div>
            <HeaderContent />
            {loading ? (
                <p>Loading books...</p>
            ) : (
                <BookCard data={books} filterBooks={(book) => true} />
            )}
        </div>
    );
};

export default Books;
