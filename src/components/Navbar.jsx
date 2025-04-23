import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ search, setSearch }) {
  return (
    <div className="navbar">
      <Link to="/" className="logo">BlogApp</Link>
      <input
        type="text"
        placeholder="Search blogs..."
        value={search}  
        onChange={setSearch} 
        className="search-input"
      />
    </div>
  );
}

export default Navbar;
