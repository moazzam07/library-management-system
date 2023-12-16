import React, { useState } from 'react';
import '../styles/form.css';

const BookList = ({ books, onDelete }) => {
  const [expandedBook, setExpandedBook] = useState(null);

  const handleShowMore = (bookID) => {
    setExpandedBook(bookID === expandedBook ? null : bookID);
  };

  return (
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
                    <span className='book-title'>{obj.title}</span> by{' '}
                    <span className='book-authors'>{obj.authors}</span>
                  </p>
                  <button onClick={() => handleShowMore(obj.id)}>
                    {expandedBook === obj.id ? 'Less' : 'More'}
                  </button>
                  {/* <button onClick={() => onDelete(obj.id)}>Delete</button> */}
                  
                </div>
                <div>
                {expandedBook === obj.id && (
                  <div className='additional-details'>
                    <p>Average Rating: {parseFloat(obj.average_rating).toFixed(2)}</p>
                    <p>Ratings Count: {obj.ratings_count}</p>
                    <p>Publication Date: {obj.publication_date}</p>
                    <p>Publisher: {obj.publisher}</p>
                    <p>Stock: {obj.stock}</p>
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
  );
};

export default BookList;
