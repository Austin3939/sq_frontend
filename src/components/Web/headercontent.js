import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './webstyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const HeaderContent = () => {
    const [books, setBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedBookshelf, setSelectedBookshelf] = useState("Reading"); // Initialize selectedBookshelf
    const navigate = useNavigate();

    const filterBooks = (book) => {
        return book.bookshelfid.name === selectedBookshelf;
    };

    const filteredBooks = books.filter(filterBooks);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : filteredBooks.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < filteredBooks.length - 1 ? prevIndex + 1 : 0));
    };

    useEffect(() => {
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
    }, []);

    const handleBookClick = async (userbookid) => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/bookapp/api/userbookdata/', {
                params: { userbookid },
                withCredentials: true
            });
            navigate(`/user-book-data/${userbookid}`, { state: { bookData: response.data } });
        } catch (error) {
            console.error('Error fetching book:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="headerbox">
            <table>
                <tbody>
                    <tr className="tabs-container">
                        <td 
                            className={`tab ${selectedBookshelf === "Reading" ? "active" : ""}`} 
                            onClick={() => setSelectedBookshelf("Reading")}
                        >
                            Reading
                        </td>
                        <td 
                            className={`tab ${selectedBookshelf === "Read" ? "active" : ""}`} 
                            onClick={() => setSelectedBookshelf("Read")}
                        >
                            Read
                        </td>
                        <td 
                            className={`tab ${selectedBookshelf === "TBR" ? "active" : ""}`} 
                            onClick={() => setSelectedBookshelf("TBR")}
                        >
                            TBR
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="bookRow">
                <table className="header-table">
                    <tbody>
                        {filteredBooks.length > 0 && (
                            <>
                                <tr>
                                    <td className="headerleft-column">
                                        <h2>{filteredBooks[currentIndex].bookid.title}</h2>
                                        <h6>{filteredBooks[currentIndex].bookid.author}</h6>
                                        <h6>Genre: {filteredBooks[currentIndex].bookid.genre} | Pages: {filteredBooks[currentIndex].bookid.pages}</h6>
                                        <h6>{filteredBooks[currentIndex].dateadded}</h6>
                                    </td>
                                    <td className="headerright-column">
                                        <div key={filteredBooks[currentIndex].userbookid} onClick={() => handleBookClick(filteredBooks[currentIndex].userbookid)}>
                                            <img src={filteredBooks[currentIndex].bookid.cover} alt={filteredBooks[currentIndex].bookid.title} className="headerimg" />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="arrows-container-l">
                                        <FontAwesomeIcon className="arrow-button" icon={faChevronLeft} onClick={handlePrevious} />
                                    </td>
                                    <td className="arrows-container-r">
                                        <FontAwesomeIcon className="arrow-button" icon={faChevronRight} onClick={handleNext} />
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HeaderContent;
