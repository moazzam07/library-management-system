import React, { useState } from 'react';
import '../styles/form.css'
import { bookTransaction } from '../services/api';


const TransactionForm = ({ books, members }) => {

  const initialFormData = {
    bookId: '',
    memberId: '',
    type: 'issue', // or 'return'
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform logic for issuing/returning books and member debt checks
    const requestData = {
      book_id: formData.bookId,
      operation: formData.type,
    };

    if (formData.type === 'issue') {
      const result = await bookTransaction(formData.memberId, requestData)
      console.log('message:', result);
      // Implement logic for issuing books
      // Update book stock and create a transaction record
    } else if (formData.type === 'return') {
      const result = await bookTransaction(formData.memberId, requestData)
      console.log('message:', result);
    }
    // Clear form or reset state as needed
    setFormData(initialFormData);
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
      <button type="submit" onClick={handleSubmit}>Submit</button>
     {/* </form> */}
    </div>
  );
};

export default TransactionForm;