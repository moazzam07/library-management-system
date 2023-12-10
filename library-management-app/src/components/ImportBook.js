import React, { useState } from 'react';
import '../styles/importBook.css'

const BookImport = () => {
  const [numBooks, setNumBooks] = useState(20);
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publisher, setPublisher] = useState('');
  const [page, setPage] = useState('');

  const handleImport = () => {
    // You can customize the API endpoint based on your Frappe API setup
    const apiUrl = 'https://your-frappe-api-endpoint/import-books';

    // Create an array of book objects based on the provided parameters
    const booksToImport = Array.from({ length: numBooks }, (_, index) => ({
      title: title || `Book ${index + 1}`,
      authors,
      isbn,
      publisher,
      page,
    }));

    // Make a POST request to the Frappe API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ books: booksToImport }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response, e.g., show a success message
        console.log('Import successful:', data);
      })
      .catch(error => {
        // Handle errors, e.g., show an error message
        console.error('Error importing books:', error);
      });
  };

  return (
    <div className="import-box">
      <h2>Data Import</h2>
      <label>
        Number of Books to Import:
        <input type="number" value={numBooks} onChange={(e) => setNumBooks(e.target.value)} />
      </label>

      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label>
        Authors:
        <input type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} />
      </label>

      <label>
        ISBN:
        <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
      </label>

      <label>
        Publisher:
        <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
      </label>

      <label>
        Page:
        <input type="text" value={page} onChange={(e) => setPage(e.target.value)} />
      </label>

      <button onClick={handleImport}>Import Books</button>
    </div>
  );
};

export default BookImport;
