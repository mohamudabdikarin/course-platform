// src/services/auth.js
import API from './api';

export const loginUser = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  // Handle token storage, e.g., localStorage.setItem('token', response.data.token);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await API.post('/auth/signup', userData);
  return response.data;
};

// ... other auth functions like logout, forgot password