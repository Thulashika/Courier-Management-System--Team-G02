// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {

    const [userDetails, setUser] = useState({email: '', id: 0, role: '', fullName:'', image: null});

  //  useEffect(() => {
  //   // Retrieve user data from localStorage on mount
  //   const savedUser = localStorage.getItem('userDetails');

  //   if (savedUser) {
  //     setUser(JSON.parse(savedUser));
  //   }
  // }, []);

  // const login = (email, id, role, fullName) => {
  //   setUser({...userDetails, email, id, role, fullName });
  //   localStorage.setItem('userDetails', JSON.stringify({email, id, role, fullName}))
  // };

  // const logout = () => {
  //   localStorage.removeItem('userDetails')
  // }

  useEffect(() => {
    const savedUser = localStorage.getItem('userDetails');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user details:', error);
      }
    }
  }, []);

  const login = (email, id, role, fullName, image) => {
    const userData = { email, id, role, fullName, image };
    setUser(userData);
    localStorage.setItem('userDetails', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser({ email: '', id: 0, role: '', fullName: '', image: null });
    localStorage.removeItem('userDetails');
  };

  return (
    <AuthContext.Provider value={{ userDetails, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
