import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './formstyle.css';
import './userbookdataform.css';

const UserBookDataForm = () => {
  const { userbookid } = useParams(); // Get the userbookid from the URL
  const [data, setData] = useState(null); // State to hold book data
  const [formData, setFormData] = useState({
    startdate: '',
    finishdate: '',
    rating: '',
    notes: '',
  });

  // Fetch the specific book data based on userbookid
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/bookapp/api/userbooks/?userbookid=${userbookid}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const bookDataArray = await response.json(); // Assuming the response is an array
        console.log('Fetched book data:', bookDataArray); // Log the response

        // If bookDataArray is an array, filter it to find the object with the matching userbookid
        const bookData = Array.isArray(bookDataArray)
          ? bookDataArray.find(book => book.userbookid === Number(userbookid)) // Use Number to ensure type matches
          : bookDataArray;

        if (bookData) {
          setData(bookData); // Set the book data
          setFormData({
            startdate: bookData.startdate || '',
            finishdate: bookData.finishdate || '',
            rating: bookData.rating || '',
            notes: bookData.notes || '',
          });
        } else {
          setData(null); // Handle case where no matching book is found
          console.error('No matching book found for userbookid:', userbookid);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [userbookid]); // Re-run the effect when userbookid changes

  // Show loading or error state if data is still being fetched or if there's an error
  if (!data) {
    return <p>No book information available.</p>; // Fallback if there is no data
  }

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the input is a range, update the value as a number
    const newValue = name === "rating" ? parseInt(value, 10) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Send data to Django backend (update the URL to point to Django's API)
    fetch('http://127.0.0.1:8000/bookapp/api/update-book/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, userbookid }), // Include userbookid in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update book'); // Handle non-2xx responses
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
        // Optionally reset the form or show a success message
      })
      .catch((error) => {
        console.error('Error:', error);
        // Optionally show an error message to the user
      });
  };
  
  return (
    <div className="form-container">
      <div className="bookshelfTable">
        <div key={data.userbookid} className="bookHolder">
          {data.bookid && <img src={data.bookid.cover} alt={data.bookid.title} />} {/* Check if bookid exists */}
          <div>
            <h2>{data.bookid ? data.bookid.title : 'Title not available'}</h2>
            <p>{data.bookid ? data.bookid.author : 'Author not available'}</p>
            <p> Bookshelf: <b>{data.bookshelfid ? data.bookshelfid.name : 'Publishing date not available'}</b></p>
          </div>
        </div>
      </div>

      <form className="styled-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">
            Start Date
            <input
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label className="form-label">
            Finish Date
            <input
              type="date"
              name="finishdate"
              value={formData.finishdate}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>

        <div className="form-row">
    <label className="form-label">
          Rating
          <input
            type="range" // Range slider for rating
            name="rating"
            min="0" // Minimum value
            max="5" // Maximum value
            step="1" // Step size
            value={formData.rating}
            onChange={handleChange}
            className="form-input"
          />
      <span>{formData.rating}</span> {/* Display current rating value */}
    </label>

          <label className="form-label">
            Notes
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-input"
            />
          </label>
        </div>

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserBookDataForm;
