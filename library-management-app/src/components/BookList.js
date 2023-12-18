import React, { useState, useEffect } from 'react';
import '../styles/form.css';
import { deleteBook, fetchBooks } from '../services/api';
import { useNavigate } from 'react-router-dom';


const BookList = () => {
  const [expandedBook, setExpandedBook] = useState(null);
  const [books, setBooks] = useState("")

  const navigate = useNavigate();


  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const result = await fetchBooks();
        console.log(result)
        setBooks(result);
      } catch (error) {
        console.error('Error Fetching Books:', error);
      }
    };

    fetchBooksData();
  }, []);

  const handleShowMore = (bookID) => {
    setExpandedBook(bookID === expandedBook ? null : bookID);
  };

  const handleEditBook = (bookID) => {
    navigate(`/books/edit/${bookID}`);
  }

  const handleDeleteBook = async (bookID) => {
    const result = await deleteBook(bookID)
    alert(result)
  }

  return (
    books && (
    <div className='form'>
      <h2>Book List</h2>
      <ul className='book-list'>
        {Object.keys(books).map((bookKey) => {
          const book = books[bookKey];
          return (
            <li key={bookKey} className='book-item'>
              {book.map((obj) => (
                <>
                <div key={obj.id} className='book-info'>
                  <p>
                    <span className='book-title'>{obj.title}</span> 
                  </p>
                  <button onClick={() => handleShowMore(obj.id)}>
                    {expandedBook === obj.id ? 'Less' : 'More'}
                  </button>
                  {/* <button onClick={() => onDelete(obj.id)}>Delete</button> */}
                  
                </div>
                <div>
                {expandedBook === obj.id && (
                  <div className='book-details-box'>
                    <p>Authors: {obj.authors}</p>
                    <p>Average Rating: {parseFloat(obj.average_rating).toFixed(2)}</p>
                    <p>Ratings Count: {obj.ratings_count}</p>
                    <p>Publication Date: {obj.publication_date}</p>
                    <p>Publisher: {obj.publisher}</p>
                    <p>Rent Fee: {obj.rent_fee}</p>
                    <p>Stock: {obj.stock}</p>
                    <button onClick={() => handleDeleteBook(obj.id)}>Delete Book</button>
                    <button onClick={() => handleEditBook(obj.id)}>Edit Book</button>
                  </div>
                )}
                </div>
                </>
              ))}
            </li>
          );
        })}
      </ul>
    </div>
  )
  );
};

export default BookList;
