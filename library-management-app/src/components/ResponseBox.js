import React, { useState } from 'react';
import "../styles/importBook.css"
import { createBook } from '../services/api';



const ResponseBox = ({ responseData }) => {
  const formatNumber = (value) => {
    return Number(value);
  };

  const [stockQuantity, setStockQuantity] = useState(0);
  const [rentFee, setRentFee] = useState(0)


  const handleAddBook = async (bookData,) => {
    try {
      const bookWithStock = { ...bookData, stock: stockQuantity, rent_fee: rentFee };
      const newBook = await createBook(bookWithStock);
      alert('Book added successfully!', newBook.title);
    } catch (error) {
      alert('Error adding book. Please check the data format.');
      console.error(error.response.data.message);
    }
  };
  return (
    <div className="response-box">
      {responseData?.map((book, index) => (
        <div key={index} className="book-details">
          <p><b>Title:</b> {book.title}</p>
          <p><b>Authors:</b> {book.authors}</p>
          <p><b>Average Rating:</b> {parseFloat(book.average_rating).toFixed(2)}</p>
          <p><b>Ratings Count:</b> {formatNumber(book.ratings_count)}</p>
          <p><b>Publication Date:</b> {book.publication_date}</p>
          <p><b>Publisher:</b> {book.publisher}</p>
          <p>
            <b>Stock:</b>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(parseInt(e.target.value, 10))}
              
            />
          </p>
          <p>
            <b>Price:</b>
            <input
              type="number"
              value={rentFee}
              onChange={(e) => setRentFee(parseInt(e.target.value, 10))}
            />
          </p>
          <button onClick={() => handleAddBook(book)} className='custom-button'>Add Book</button>
          {index < responseData.length - 1 && <hr className="book-separator" />}
          
        </div>
      ))}
    </div>
  );
};

export default ResponseBox;
