import React from 'react';
import '../styles/form.css'

const books = [ {"bookID":"33133","title":"King Richard II","authors":"William Shakespeare/Andrew Gurr","average_rating":"3.77","isbn":"0521297656","isbn13":"9780521297653","language_code":"eng","  num_pages":"240","ratings_count":"27","text_reviews_count":"3","publication_date":"11/30/1984","publisher":"Cambridge University Press"}]


const BookList = ({ onDelete }) => {
  return (
    <div className='form'>
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.authors}{' '}
            <button onClick={() => onDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;