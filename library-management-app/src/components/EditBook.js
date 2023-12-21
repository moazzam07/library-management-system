import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateBook } from '../services/api';
import { useNavigate } from 'react-router-dom';

const EditBook = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [book, setBook] = useState({
    title: '',
    authors: '',
    rent_fee: '',
    stock: '',
  });  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const updatedBook = Object.fromEntries(
    Object.entries(book).filter(([key, value]) => value !== '' && value !== 0)
  );

  const handleEditBook = async (bookId) => {
    try {
      // Call the API to update the book
      console.log(updatedBook)
      await updateBook(bookId, updatedBook);
      navigate(`/`);
      alert('Book updated successfully!');
    } catch (error) {
      alert(error.response.data.message);
      // console.error('Error updating book:', error);
    }
  };

  return (
    <div className='form1'>
      <h2>Edit Book</h2>
      <form>
        {/* Include input fields for each book detail */}
        <label>
          Title:
          <input type="text" name="title" value={book.title} onChange={handleInputChange} />
        </label>
        <label>
          Authors:
          <input type="text" name="authors" value={book.authors} onChange={handleInputChange} />
        </label>
        <label>
          Rent Fee:
          <input type="number" name="rent_fee" value={book.rent_fee} onChange={handleInputChange} />
        </label>
        <label>
          Stock:
          <input type="number" name="stock" value={book.stock} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={() => handleEditBook(id, book)}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBook;
