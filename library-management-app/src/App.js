import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookImport from './components/ImportBook';
import BookList from './components/BookList';
import MemberList from './components/MemberList';
import EditBook from './components/EditBook';
import MemberForm from './components/MemberForm';
import TransactionForm from './components/TransactionForm';
import NavBar from './components/NavBar';
import EditMember from './components/EditMember';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar/>
        <Routes>
          <Route path="/import" element={<BookImport/>}/>

          <Route path="/" element={<BookList/>}/>
                      
          <Route path="/books/edit/:id"  element = {<EditBook/>} />
          
          <Route path="/members" element= {<MemberList/>}/>
            
          <Route path="/members/new" element = {<MemberForm/>} />
            
          <Route path="/members/edit/:id" element= {<EditMember/>} />
      
          <Route path="/transactions" element={<TransactionForm/>} /> 
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;