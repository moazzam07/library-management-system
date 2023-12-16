// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'


const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/import">Import Data</Link>
        </li>
        <li>
          <Link to="/books">Book List</Link>
        </li>
        <li>
          <Link to="/books/edit/:id">Edit Book</Link>
        </li>
        <li>
          <Link to="/members">Members List</Link>
        </li>
        <li>
          <Link to="/members/new">Add Member</Link>
        </li>
        <li>
          <Link to="/member/edit/:id">Edit Member</Link>
        </li>
        <li>
          <Link to="/transactions">Transaction</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
