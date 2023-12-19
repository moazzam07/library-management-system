import React, { useState } from 'react';
import '../styles/form.css'
import { bookTransaction } from '../services/api';


const TransactionForm = () => {

  const initialFormData = {
    bookId: '',
    memberId: '',
    type: 'issue', // or 'return'
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
    const requestData = {
      book_id: formData.bookId,
      operation: formData.type,
    };

    if (formData.type === 'issue') {
      const result = await bookTransaction(formData.memberId, requestData)
      alert(result.message)
    } else if (formData.type === 'return') {
      const result = await bookTransaction(formData.memberId, requestData)

      alert(result.message)
    }
    setFormData(initialFormData);
    } catch(error) {
      alert('Some thing went wrong', error);
    }
  };

  return (
    <div className='form1'>
      <h2>Book Transaction</h2>
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
          className='select-type'
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="issue">Issue</option>
          <option value="return">Return</option>
        </select>
      </label>
      <button type="submit" onClick={handleSubmit} className='transaction-button'>Submit</button>
      
    </div>
  );
};

export default TransactionForm;