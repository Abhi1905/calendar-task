import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { LoginForm } from './components/Auth/LoginForm';
import { Calendar } from './components/Calendar/Calendar';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return currentUser ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/" replace /> : <LoginForm />} 
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Calendar />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;