// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api', // Default to a local mock/dev server
  headers: {
    'Content-Type': 'application/json',
    // Add authorization header if needed, e.g., 'Authorization': `Bearer ${localStorage.getItem('token')}`
  },
});

export default API;