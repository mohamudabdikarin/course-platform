// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
// import { loginUser, signupUser } from '../services/auth'; // You'd use these here

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for a token in localStorage on app load
    const token = localStorage.getItem('token');
    if (token) {
      // In a real app, you'd validate the token with your backend here
      setUser({ /* decode user data from token or fetch user profile */ });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // const data = await loginUser(credentials);
    // setUser(data.user);
    // localStorage.setItem('token', data.token);
    // Mock login for now
    return new Promise(resolve => setTimeout(() => {
      const mockUser = { id: '123', name: credentials.email, role: 'student' };
      setUser(mockUser);
      localStorage.setItem('token', 'mock_token');
      resolve(mockUser);
    }, 500));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  if (loading) return <div>Loading authentication...</div>; // Simple loading state

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);