import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookImport from './components/ImportBook';
import BookList from './components/BookList';
import MemberList from './components/MemberList';
import BookForm from './components/BookForm';
import MemberForm from './components/MemberForm';
import TransactionForm from './components/TransactionForm';
import NavBar from './components/NavBar';
import {
  fetchBooks,
  importBooks,
  createBook,
  updateBook,
  deleteBook,
  createMember,
  updateMember,
  deleteMember,
} from './services/api';

const App = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchBooks({}).then((data) => setBooks(data));
    // Similar logic for fetching members
  }, []);

  const handleImportBooks = async () => {
    // Handle importing logic (if needed)
    await importBooks({});
    // Refresh book list after importing
    fetchBooks({}).then((data) => setBooks(data));
  };

  const handleCreateBook = async (bookData) => {
    const newBook = await createBook(bookData);
    setBooks([...books, newBook]);
  };

  const handleUpdateBook = async (bookId, bookData) => {
    await updateBook(bookId, bookData);
    // Refresh book list after updating
    fetchBooks({}).then((data) => setBooks(data));
  };

  const handleDeleteBook = async (bookId) => {
    await deleteBook(bookId);
    // Refresh book list after deleting
    fetchBooks({}).then((data) => setBooks(data));
  };

  const handleCreateMember = async (memberData) => {
    const newMember = await createMember(memberData);
    setMembers([...members, newMember]);
  };

  const handleUpdateMember = async (memberId, memberData) => {
    await updateMember(memberId, memberData);
    // Refresh member list after updating
    // Similar logic for refreshing books
  };

  const handleDeleteMember = async (memberId) => {
    await deleteMember(memberId);
    // Refresh member list after deleting
    // Similar logic for refreshing books
  };

  const handleCreateTransaction = async (transactionData) => {
    // Handle transaction logic (e.g., update book stock, charge rent fee)
    // Refresh book and member lists after the transaction
    fetchBooks({}).then((data) => setBooks(data));
    // Similar logic for refreshing members
  };

  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/import" element={<BookImport onImport={handleImportBooks}/>}/>

          <Route path="/books" element={<BookList books={books} onDelete={handleDeleteBook}/>}/>
          
          <Route path="/books/new" element={<BookForm onSubmit={handleCreateBook} />} />
            
          <Route path="/books/edit/:id"  element = {<BookForm onSubmit={handleUpdateBook} />} />
          
          <Route path="/members" element= {<MemberList members={members} onDelete={handleDeleteMember} />}/>
            
          <Route path="/members/new" element = {<MemberForm onSubmit={handleCreateMember} />} />
            
          <Route path="/members/edit/:id" element= {<MemberForm onSubmit={handleUpdateMember} />} />
      
          <Route path="/transactions" element={<TransactionForm
              books={books}
              members={members}
              onSubmit={handleCreateTransaction}
            />} /> 
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;