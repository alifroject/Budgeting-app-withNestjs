import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import Login from './pages/public/login/Login';
import OAuthCallback from './pages/public/login/OAuthCallback';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  return <PublicLayout>{children}</PublicLayout>;
};

function AppContent() {
  return (
    <Router>
      <Routes>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />


        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        <Route path="/dashboard" element={<div>Dashboard Coming Soon</div>} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;