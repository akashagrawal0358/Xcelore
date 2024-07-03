import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary">
      <div className="container-fluid">
        <div className=" navbar-collapse mx-5" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 m-2 px-5 mx-4">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            {userRole === 'admin' && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">Admin Dashboard</NavLink>
              </li>
            )}
            {userRole === 'user' && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/user">User Dashboard</NavLink>
              </li>
            )}
          </ul>
          <button onClick={logout} className="btn btn-outline-danger">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
