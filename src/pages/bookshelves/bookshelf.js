import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookshelfFull from '../../components/BookshelfFull';
import '../../Test/FullWidth.css';

const Bookshelf = () => {
    const [bookshelves, setBookshelves] = useState([]);
    const [selectedBookshelf, setSelectedBookshelf] = useState('');
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
        // Fetch all user book data
        axios.get('http://127.0.0.1:8000/bookapp/api/userbooks/', { withCredentials: true })
            .then(response => {
                // Create a map to filter unique bookshelves by id
                const uniqueBookshelvesMap = {};
                response.data.forEach(item => {
                    const bookshelfId = item.bookshelfid.bookshelfid;
                    if (!uniqueBookshelvesMap[bookshelfId]) {
                        uniqueBookshelvesMap[bookshelfId] = {
                            id: bookshelfId,
                            name: item.bookshelfid.name,
                        };
                    }
                });
                
                // Convert the map back to an array
                const uniqueBookshelves = Object.values(uniqueBookshelvesMap);
                setBookshelves(uniqueBookshelves);
            })
            .catch(error => console.log(error));
    }, []);
  
    const handleFilterChange = (event) => {
        const selectedBookshelf = event.target.value;
        setSelectedBookshelf(selectedBookshelf);
    
        // Fetch books filtered by selected bookshelf
        axios.get(`http://127.0.0.1:8000/bookapp/api/userbooks/?bookshelf_name=${selectedBookshelf}`, { withCredentials: true })
            .then(response => setBooks(response.data))
            .catch(error => {
                console.error('Error fetching books:', error.response.data);
                // Optionally set an error state here to display in UI
            });
    };

    return (
        <div className="pagecontainer">
            <h1>Bookshelf</h1>
            <div className="pageContent">
                {/* Dropdown for filtering books by bookshelf */}
                <select id="bookshelfFilter" value={selectedBookshelf} onChange={handleFilterChange}>
                    <option value="">Select a Bookshelf</option>
                    {bookshelves.map((shelf) => (
                        <option key={shelf.id} value={shelf.name}>
                            {shelf.name}
                        </option>
                    ))}
                </select>

                {/* Display books */}
                <BookshelfFull data={books} />
            </div>
        </div>
    );
};

export default Bookshelf;





