import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';

const User = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <>
        <Navbar />
      <div className="my-5 mx-5">
        {userInfo ? (
          <div>
            <h1>User Information</h1>
            <br/>
            <p><strong>First Name:</strong> {userInfo.firstName}</p>
            <p><strong>Last Name:</strong> {userInfo.lastName}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Role:</strong> {userInfo.role}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
    </>
  );
};

export default User;
