import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      login(email, password);
      if (response.data.role == 'admin') {
        navigate('/admin');
      }else{
        navigate('/user');
      }

    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center py-2">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group py-2">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control my-2"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group py-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control my-2"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary btn-block my-2">
                  Login
                </button>

                <NavLink className="nav-link active btn btn-secondary  my-2 mx-2 p-1" aria-current="page" to="/register">Register Here</NavLink>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
