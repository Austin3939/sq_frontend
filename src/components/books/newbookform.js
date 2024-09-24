import React, { useState } from 'react';
import './formstyle.css';

const NewBookForm = () => {
  // State to hold form data
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

    // Send data to backend (Django API)
    fetch('/api/create-book/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        // Handle success (e.g., show success message, reset form, etc.)
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error (e.g., show error message)
      });
  };

  return (
<div className="form-container">
  <h1 className="heading">Book Entry</h1>
  <form className="styled-form" onSubmit={handleSubmit}>
    <div className="form-row">
      <label className="form-label">
        Book Title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Author
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="form-input"
        />
      </label>
    </div>

    <div className="form-row">
      <label className="form-label">
        Cover
        <input
          type="text"
          name="cover"
          value={formData.cover}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Publisher
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          className="form-input"
        />
      </label>
    </div>

    <div className="form-row">
      <label className="form-label">
        Publishing Date
        <input
          type="date"
          name="publishingdate"
          value={formData.publishingdate}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Genre
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="form-input"
        />
      </label>
    </div>

    <div className="form-row">
      <label className="form-label">
        Pages
        <input
          type="number"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Bookshelf ID
        <input
          type="text"
          name="bookshelfid"
          value={formData.bookshelfid}
          onChange={handleChange}
          className="form-input"
        />
      </label>
    </div>

    <button type="submit" className="form-button">Submit</button>
  </form>
</div>
  );
};

export default NewBookForm;
