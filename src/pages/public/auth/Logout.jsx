import React from 'react';
import getAuthenticatedUser from '../../../config/ConfigIdentity';

const Logout = () => {
  const handleLogout = async () => 
  {
    localStorage.removeItem('user');
    await getAuthenticatedUser.removeUser();
    await getAuthenticatedUser.signoutRedirect();
  };

  handleLogout();

  return <div>Logging out...</div>;
};

export default Logout;
