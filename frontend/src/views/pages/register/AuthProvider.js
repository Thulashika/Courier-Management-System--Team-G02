// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {

    const [userDetails, setUser] = useState({email: '', id: 0, role: ''});

   useEffect(() => {
    // Retrieve user data from localStorage on mount
    const savedUser = localStorage.getItem('userDetails');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, id, role) => {
    setUser({...userDetails, email, id, role });
    localStorage.setItem('userDetails', JSON.stringify({email, id, role}))
  };

  const logout = () => {
    localStorage.removeItem('userDetails')
  }

  return (
    <AuthContext.Provider value={{ userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
