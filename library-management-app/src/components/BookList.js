import React, { useState, useEffect } from 'react';
import '../styles/form.css';
import { deleteBook, fetchBooks } from '../services/api';
import { useNavigate } from 'react-router-dom';


const BookList = () => {
  const [expandedBook, setExpandedBook] = useState(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [books, setBooks] = useState("")

  const navigate = useNavigate();


  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const result = await fetchBooks();
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
    alert(result.message)
    window.location.reload();
  }
  // const bookArray = Object.values(books);
  // console.log(books)
  const filteredBooks = books
  ? books.books.filter((book) => (
    book?.title?.toLowerCase().includes(searchQuery.toLowerCase())))
  : [];
  
  console.log(typeof filteredBooks)
  return (
    
    <div className='form'>
      <div className='div-class'>
      <h2>Book List
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='search-box'
              placeholder='Search Book'
            />
      </h2>
      </div>
      {books && 
      <ul className='book-list'>
      <li>
      {filteredBooks.map((bookKey) => {
          const obj = bookKey;
          return (
            <li key={bookKey} className='book-item'>
              {/* {book.map((obj) => ( */}
                <><div key={obj.id} className='book-info'>
                  <p>
                    <span className='book-title'>{obj.title}</span>
                  </p>
                  <button onClick={() => handleShowMore(obj.id)}>
                    {expandedBook === obj.id ? 'Less' : 'More'}
                  </button>
                </div><div>
                    {expandedBook === obj.id && (
                      <div className='book-details-box'>
                        <p><b>Authors:</b> {obj.authors}</p>
                        <p><b>Average Rating:</b> {parseFloat(obj.average_rating).toFixed(2)}</p>
                        <p><b>Ratings Count:</b> {obj.ratings_count}</p>
                        <p><b>Publication Date:</b> {obj.publication_date}</p>
                        <p><b>Publisher:</b> {obj.publisher}</p>
                        <p><b>Rent Fee:</b> {obj.rent_fee}</p>
                        <p><b>Stock:</b> {obj.stock}</p>                        
                        <button onClick={() => handleEditBook(obj.id)}>Edit Book</button>
                        <button onClick={() => handleDeleteBook(obj.id)}>Delete Book</button>
                      </div>
                    )}
                  </div></>
              {/* )) */}
            </li>
          )
        })}
        </li>
      </ul>
        }
    </div>
  )

};

export default BookList;
