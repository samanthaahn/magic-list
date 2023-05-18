import React from 'react';
import Auth from '../utils/auth';

const Logout = () => {
  const handleLogout = () => {
    Auth.logout();
    // Redirect the user to the login screen with a success message
    window.location.assign('/login?message=logout');
  };

  return (
    <a className="nav-item" href="#" onClick={handleLogout}>
      Log Out
    </a>
  );
};

export default Logout;
