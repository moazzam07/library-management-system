// ResponseBox.js
import React, { useState } from 'react';
import "../styles/importBook.css"
import { createBook } from '../services/api';



const ResponseBox = ({ responseData }) => {
  const formatNumber = (value) => {
    // Convert the string to a number and format it
    return Number(value);
  };

  const [stockQuantity, setStockQuantity] = useState(0);


  const handleAddBook = async (bookData,) => {
    try {
      // Call the API to add a new book
      console.log(bookData)
      const bookWithStock = { ...bookData, stock: stockQuantity };
      const newBook = await createBook(bookWithStock);
      // onAdd(newBook); // Notify the parent component to refresh the book list
      alert('Book added successfully!', newBook.title);
    } catch (error) {
      alert('Error adding book. Please check the data format.');
      console.error('Error adding book:', error);
    }
  };
  return (
    <div className="response-box">
      
      {responseData?.map((book, index) => (
        <div key={index} className="book-details">
          {/* <p>Book Id: {book.bookID}</p> */}
          <p><b>Title:</b> {book.title}</p>
          <p><b>Authors:</b> {book.authors}</p>
          <p><b>Average Rating:</b> {parseFloat(book.average_rating).toFixed(2)}</p>
          <p><b>Ratings Count:</b> {formatNumber(book.ratings_count)}</p>
          <p><b>Publication Date:</b> {book.publication_date}</p>
          <p><b>Publisher:</b> {book.publisher}</p>
          <label>
            <b>Stock Quantity:</b>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(parseInt(e.target.value, 10))}
            />
          </label>
          <button onClick={() => handleAddBook(book)}>add</button>
          {index < responseData.length - 1 && <hr className="book-separator" />}
          
        </div>
      ))}
    </div>
  );
};

export default ResponseBox;
