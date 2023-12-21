import React, { useState } from 'react';
import '../styles/importBook.css'
import { importBooks } from '../services/api';
import ResponseBox from './ResponseBox';

const BookImport = () => {
  const [importData, setImportData] = useState({
    title: '',
    authors: '',
    isbn: '',
    publisher: '',
    page: ''
  });
  const [responseData, setResponseData] = useState(null);

  const cleanUpPropertyNames = (data) => {
    return data.map((item) => {
      return Object.keys(item).reduce((cleanedItem, key) => {
        const cleanedKey = key.trim(); // Remove leading and trailing white space
        cleanedItem[cleanedKey] = item[key];
        return cleanedItem;
      }, {});
    });
  };

  const handleImport = async () => {
    try {
      // Call the importBooks function to make the API request
      const result = await importBooks(importData);
      const cleanedResult = cleanUpPropertyNames(result.message)
      setResponseData(cleanedResult)
      
      console.log('Import result:', cleanedResult);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error importing books:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Call the button click function when Enter is pressed
      handleImport();
    }
  };

  const handleInputChange = (e) => {
    // Update the state when the user types in the input field
    const { name, value } = e.target;
    setImportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed-size-container">
    <div className="import-box">
      <h2>Book Import</h2>
      {!responseData && (
      <div className='box'>
        <label>
            Title:
            <input
              type="text"
              name="title"
              value={importData.title}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}  />
          </label>
          <label>
              Authors:
              <input
                type="text"
                name="authors"
                value={importData.authors}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}  />
            </label><label>
              isbn:
              <input
                type="text"
                name="isbn"
                value={importData.isbn}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}  />
            </label><label>
              Publisher:
              <input
                type="text"
                name="publisher"
                value={importData.publisher}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}  />
            </label><label>
              Page:
              <input
                type="text"
                name="page"
                value={importData.page}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}  />
            </label></div>
      )}
      {responseData && (
        <>
          <ResponseBox responseData={responseData} />
        </>
      )}
      {!responseData && 
      <button onClick={handleImport} className='custom-button'>Import Books</button>
      }
    </div>
    </div>
  );
};

export default BookImport;