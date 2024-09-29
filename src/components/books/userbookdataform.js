import React, { useState } from 'react';
import './formstyle.css';

const UserBookDataForm = () => {
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
        Start Date
        <input
          type="text"
          name="startdate"
          value={formData.startdate}
          onChange={handleChange}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Finish Date
        <input
          type="text"
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
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="form-input"
        />
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

    <button type="submit" className="form-button">Submit</button>
  </form>
</div>
  );
};

export default UserBookDataForm;
