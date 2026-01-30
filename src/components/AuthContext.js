import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  try {
    const userData = localStorage.getItem("ency"); // ✅ plain string: "admin", "vendor", etc.
    if (userData) {
      setRole(userData); // ✅ no JSON.parse needed
    }
  } catch (error) {
    console.error('Error reading user data from localStorage:', error);
    localStorage.removeItem('ency');
  } finally {
    setIsLoading(false);
  }
}, []);


  const value = {
    role,
    isLoading,
    setRole // Expose setRole for login functionality
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};