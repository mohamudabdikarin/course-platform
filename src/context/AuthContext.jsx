import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true); // Start with loading=true

  useEffect(() => {
    // This effect runs once on initial app load.
    // Its purpose is to check if we have a token and set the user,
    // effectively "logging them in" if they have a valid session.
    const initializeAuth = async () => {
      if (token) {
        // In a real app, you would verify the token with your backend here.
        // For now, we'll simulate it. If a token exists, we assume the user is logged in.
        setUser({ name: 'John Instructor', email: 'instructor@email.com' });
      }
      // CRITICAL: Set loading to false only AFTER you've checked for the user.
      setLoading(false);
    };

    initializeAuth();
  }, [token]); // This effect depends only on the token

  // --- Auth Functions ---

  const login = (userData, userToken) => {
    // This function is called from the LoginPage
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('authToken', userToken);
  };

  const logout = () => {
    // This function can be called from a logout button
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  // The value provided to consuming components
  const value = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until the initial loading check is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 