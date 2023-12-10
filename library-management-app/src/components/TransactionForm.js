import React, { useState } from 'react';
import '../styles/form.css'


const TransactionForm = ({ onSubmit, books, members }) => {
  const [formData, setFormData] = useState({
    bookId: '',
    memberId: '',
    type: 'issue', // or 'return'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the book and member exist
    const bookExists = books.some((book) => book.id === formData.bookId);
    const memberExists = members.some((member) => member.id === formData.memberId);

    if (!bookExists || !memberExists) {
      alert('Book or member not found. Please check IDs.');
      return;
    }

    // Perform logic for issuing/returning books and member debt checks
    if (formData.type === 'issue') {
      // Implement logic for issuing books
      // Update book stock and create a transaction record
    } else if (formData.type === 'return') {
      // Implement logic for returning books
      // Update book stock, create a transaction record, and charge a rent fee
      // Check member's outstanding debt and handle accordingly
    }

    onSubmit(formData); // onSubmit will be a createTransaction function
    // Clear form or reset state as needed
  };

  return (
    <div className='form'>
    {/* <form onSubmit={handleSubmit}> */}
      <label>
        Book ID:
        <input
          type="text"
          value={formData.bookId}
          onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
        />
      </label>
      <label>
        Member ID:
        <input
          type="text"
          value={formData.memberId}
          onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
        />
      </label>
      <label>
        Transaction Type:
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="issue">Issue</option>
          <option value="return">Return</option>
        </select>
      </label>
      <button type="submit">Submit Transaction</button>
     {/* </form> */}
    </div>
  );
};

export default TransactionForm;