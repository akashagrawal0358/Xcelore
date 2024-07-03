import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    console.log( "login 2............" );
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);

      console.log(response.data.user);
      
      setUserRole(response.data.user.role);
      setUserInfo(response.data.user); 
      console.log( "login 222............" );
      if (response.data.user.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
      setUserRole(null);
      setUserInfo(null); 
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
    setUserInfo(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
