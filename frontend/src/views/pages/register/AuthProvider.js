// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {

    const [userDetails, setUser] = useState({email: '', id: 0, role: '', fullName:''});
    const [branch, setBranch] = useState({id: 0})

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

    const savedBranch = localStorage.getItem('branch');
    if (savedBranch) {
      try {
        setBranch(JSON.parse(savedBranch));
      } catch (error) {
        console.error('Failed to parse branch details:', error);
      }
    }
  }, []);

  const login = (email, id, role, fullName) => {
    const userData = { email, id, role, fullName };
    setUser(userData);
    localStorage.setItem('userDetails', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser({ email: '', id: 0, role: '', fullName: '' });
    localStorage.removeItem('userDetails');
  };
  
  const branchCount = (id) => {
    const branchData = { id };
    setBranch(branchData);
    localStorage.setItem('branch', JSON.stringify(branchData));
  };
  

  // useEffect(() => {
  //   // Retrieve branch data from localStorage on mount
  //   const savedBranch = localStorage.getItem('branch')

  //   if(savedBranch) {
  //     setBranch(JSON.parse(savedBranch))
  //   }
  // }, [])

  // const branchCount = (id) => {
  //   setBranch({...branch, id})
  //   localStorage.setItem('branch', JSON.stringify({id}))
  // }

  return (
    <AuthContext.Provider value={{ userDetails, login, logout, branch, branchCount }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
