// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { role, isLoading } = useAuth();

  // 1️⃣ While we're still initializing (reading localStorage), render nothing or a loader
  if (isLoading) {
    return null; // or <div>Loading...</div>
  }

  // 2️⃣ Once loaded, if no role or role not permitted, redirect
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
