// src/components/BookForm.js
import React, { useState, useEffect } from 'react';

const BookForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    // Add other book properties
  });

  useEffect(() => {
    // If initialData is provided, populate the form with it (for editing)
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // onSubmit will be either handleCreateBook or handleUpdateBook
    // Clear form or reset state as needed
    setFormData({
      title: '',
      author: '',
      // Reset other book properties
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </label>
      <label>
        Author:
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
      </label>
      {/* Add other form fields */}
      <button type="submit">{initialData ? 'Update Book' : 'Add Book'}</button>
    </form>
  );
};

export default BookForm;
