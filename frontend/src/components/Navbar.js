import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRole, getToken } from '../services/api';
import '../components/Navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();
  const role = getUserRole();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <Link className="navbar-link" to="/"><h2>Blog Post App</h2></Link>
      </div>
      <ul className="navbar-list">
        <li className="navbar-item"><Link className="navbar-link" to="/">Home</Link></li>
        {!token ? (
          <>
            <li className="navbar-item"><Link className="navbar-link" to="/login">Login</Link></li>
            <li className="navbar-item"><Link className="navbar-link" to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </li>
            {role === 'admin' && (
              <li className="navbar-item"><Link className="navbar-link" to="/new-post">Create Post</Link></li>
            )}
          </>
        )}
      </ul>
      
    </nav>
    
  );
 
};

export default Navbar;
