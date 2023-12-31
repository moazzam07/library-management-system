import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'


const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Book List</Link>
        </li>
        <li>
          <Link to="/import">Import Data</Link>
        </li>
        <li>
          <Link to="/members">Members List</Link>
        </li>
        <li>
          <Link to="/members/new">Add Member</Link>
        </li>
        <li>
          <Link to="/transactions">Transaction</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
