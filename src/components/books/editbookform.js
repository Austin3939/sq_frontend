import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // To get book ID from URL params
import './bookstyles.css';

const EditBookForm = () => {
  const { bookId } = useParams(); // Assuming you're passing bookId via URL
  const [formData, setFormData] = useState({
    googleid: '',
    title: '',
    author: '',
    cover: '',
    publisher: '',
    publishingdate: '',
    genre: '',
    pages: '',
    personid: '',
    bookshelfid: ''
  });

  // Fetch the book data on component mount
  useEffect(() => {
    // Fetch the existing book data
    fetch(`/api/get-book/${bookId}/`)
      .then(response => response.json())
      .then(data => {
        setFormData({
          googleid: data.googleid || '',
          title: data.title || '',
          author: data.author || '',
          cover: data.cover || '',
          publisher: data.publisher || '',
          publishingdate: data.publishingdate || '',
          genre: data.genre || '',
          pages: data.pages || '',
          personid: data.personid || '',
          bookshelfid: data.bookshelfid || ''
        });
      })
      .catch(error => {
        console.error('Error fetching book data:', error);
      });
  }, [bookId]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated data to the backend (Django API)
    fetch(`/api/update-book/${bookId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Book updated successfully:', data);
        // Handle success (e.g., show success message)
      })
      .catch(error => {
        console.error('Error updating book:', error);
        // Handle error (e.g., show error message)
      });
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Google ID:
          <input
            type="text"
            name="googleid"
            value={formData.googleid}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Cover:
          <input
            type="text"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Publisher:
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Publishing Date:
          <input
            type="date"
            name="publishingdate"
            value={formData.publishingdate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Pages:
          <input
            type="number"
            name="pages"
            value={formData.pages}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Person ID:
          <input
            type="text"
            name="personid"
            value={formData.personid}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Bookshelf ID:
          <input
            type="text"
            name="bookshelfid"
            value={formData.bookshelfid}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBookForm;
