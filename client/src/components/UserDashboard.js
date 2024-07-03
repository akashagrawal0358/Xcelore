import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const User = () => {
  const { userInfo } = useContext(AuthContext);

  return (
    <div>
      {userInfo ? (
        <div>
          <h1>User Information</h1>
          <p><strong>First Name:</strong> {userInfo.firstName}</p>
          <p><strong>Last Name:</strong> {userInfo.lastName}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default User;
