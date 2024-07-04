import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(" frontend......");
      const response = await axios.post('http://localhost:8000/api/auth/register', { firstName: fname, lastName: lname, email, password  });
      console.log(response);
      navigate('/login');
    } catch (error) {
      setError('Error registering user');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className="card-title text-center py-2">Register</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group py-2">
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    className="form-control my-2"
                    id="fname"
                    placeholder="Enter first name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group py-2">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    className="form-control my-2"
                    id="lname"
                    placeholder="Enter last name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </div>
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
                  Register
                </button>
              </form>
              <NavLink className="nav-link active btn btn-secondary  my-2 mx-2 p-1" aria-current="page" to="/login">Login Here</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
