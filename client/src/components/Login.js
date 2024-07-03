
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body ">
              <h3 className="card-title text-center py-2">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group py-2">
                  <label htmlFor="email py-2">Email address</label>
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
                  <label htmlFor="password py-2">Password</label>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
