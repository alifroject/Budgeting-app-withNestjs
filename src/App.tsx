import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardLayout from './layouts/DashboardLayout';
import PublicLayout from './layouts/PublicLayout';
import Login from './pages/public/login/Login';
import Register from './pages/public/register/Register';
import OAuthCallback from './pages/public/login/OAuthCallback';
import Dashboard from './pages/dashboard/Dashboard';
import { getMe } from './features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to={user.role === 'admin' ? '/users' : '/dashboard'} replace />
          ) : (
            <PublicLayout>
              <Login />
            </PublicLayout>
          )
        }
      />
      <Route
        path="/register"
        element={
          user ? (
            <Navigate to={user.role === 'admin' ? '/users' : '/dashboard'} replace />
          ) : (
            <PublicLayout>
              <Register />
            </PublicLayout>
          )
        }
      />
      <Route path="/auth/callback" element={<OAuthCallback />} />

      <Route
        path="/dashboard"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : user.role === 'admin' ? (
            <Navigate to="/users" replace />
          ) : (
            <ThemeProvider>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ThemeProvider>
          )
        }
      />

      <Route
        path="/transactions"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : (
            <ThemeProvider>
              <DashboardLayout>
                <div>Transactions Page Coming Soon</div>
              </DashboardLayout>
            </ThemeProvider>
          )
        }
      />

      <Route
        path="/budgets"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : (
            <ThemeProvider>
              <DashboardLayout>
                <div>Budgets Page Coming Soon</div>
              </DashboardLayout>
            </ThemeProvider>
          )
        }
      />

      <Route
        path="/users"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : user.role !== 'admin' ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <ThemeProvider>
              <DashboardLayout>
                <div>Users Page Coming Soon</div>
              </DashboardLayout>
            </ThemeProvider>
          )
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
