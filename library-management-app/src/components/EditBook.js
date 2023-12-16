// // src/components/EditBook.js
// import React, { useState, useEffect } from 'react';
// import BookForm from './BookForm';
// import { updateBook, fetchBooks } from '../services/api';

// const EditBook = ({ match, onEdit }) => {
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     // Fetch the book data based on the URL parameter
//     const fetchBookData = async () => {
//       try {
//         const books = await fetchBooks({});
//         const matchedBook = books.find((b) => b.id === match.params.id);
//         setBook(matchedBook);
//       } catch (error) {
//         console.error('Error fetching book data:', error);
//       }
//     };

//     fetchBookData();
//   }, [match.params.id]);

//   const handleEditBook = async (bookData) => {
//     try {
//       // Call the API to update the book
//       await updateBook(book.id, bookData);
//       onEdit(bookData); // Notify the parent component to refresh the book list
//       alert('Book updated successfully!');
//     } catch (error) {
//       alert('Error updating book. Please check the data format.');
//       console.error('Error updating book:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit Book</h2>
//       {book && <BookForm onSubmit={handleEditBook} initialData={book} />}
//     </div>
//   );
// };

// export default EditBook;
