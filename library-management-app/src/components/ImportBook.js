import React, { useState } from 'react';
import '../styles/importBook.css'
import { importBooks } from '../services/api';
import ResponseBox from './ResponseBox';

const BookImport = () => {
  const [importData, setImportData] = useState({
    title: ''
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
      <h2>Data Import</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={importData.title}
          onChange={handleInputChange}
        />
      </label>
      {responseData && (
        <>
          <ResponseBox responseData={responseData} />
          <br></br>  
        </>
      )}
      <br></br>
      {!responseData && 
      <button onClick={handleImport}>Import Books</button>
      }
      
      
    </div>
    </div>
    
    // <div>
    //   <h2>Book Import Component</h2>
    //   <button onClick={handleImport}>Import Books</button>
    // </div>
  );
};

export default BookImport;
