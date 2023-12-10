import React, { useState } from 'react';
import '../styles/form.css'

const BookForm = ({ onSubmit, book }) => {
  const [formData, setFormData] = useState({
    title: book ? book.title : '',
    author: book ? book.author : '',
    // Add other book properties
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // onSubmit will be createBook or updateBook
    // Clear form or reset state as needed
  };

  return (
    <div className='form'>
    {/* <form onSubmit={handleSubmit}> */}
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
      <button type="submit">{book ? 'Update Book' : 'Create Book'}</button>
    {/* </form> */}
    </div>
  );
};

export default BookForm;