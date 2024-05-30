import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bookshelf = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/bookapp/api/books/`)
            .then(response => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={styles.container}>
            <h2>Bookshelf</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Book</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.img}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.year}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        marginLeft: '220px', // Adjust according to your sidebar width
        padding: '1rem',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
    },
};

export default Bookshelf;
