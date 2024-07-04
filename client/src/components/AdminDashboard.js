import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AdminDashboard = () => {
  const { isAuthenticated, token } = useContext(AuthContext); // Ensure token is available here
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', role: 'User' });
  const [activeTab, setActiveTab] = useState('displayUsers');
  const navigate = useNavigate();



  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [isAuthenticated, navigate]);

  

  const fetchUsers = async () => {
    try {
      console.log(  " fetch users token  :", token);
    
      const response = await axios.get('http://localhost:8000/api/auth/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(  "fetch :" , response);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setActiveTab('editUser');
  };



  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await axios.put(`http://localhost:8000/api/auth/users/${selectedUser._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post('http://localhost:8000/api/auth/register', formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      setFormData({ firstName: '', lastName: '', email: '', role: '' });
      setSelectedUser(null);
      fetchUsers();
      setActiveTab('displayUsers');
    } catch (error) {
      console.error('Error saving user', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3">
        <h1>Admin Dashboard</h1>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('displayUsers')}>Display All Users</button>
          <button type="button" className="btn btn-secondary" onClick={() => setActiveTab('addUser')}>Add User</button>
        </div>
        {activeTab === 'displayUsers' && (
          <>
            <h2>Users</h2>
            <ul className="list-group">
              {users.map((user) => (
                <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {user.firstName} {user.lastName} ({user.email}) - {user.role}
                  <div>
                    <button className="btn btn-primary mx-2" onClick={() => handleEditUser(user)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
        {activeTab === 'addUser' && (
          <>
            <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select className="form-control" name="role" value={formData.role} onChange={handleInputChange} required>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">{selectedUser ? 'Update User' : 'Add User'}</button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
