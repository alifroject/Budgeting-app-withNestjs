import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import DashboardLayout from './layouts/DashboardLayout';
import PublicLayout from './layouts/PublicLayout';
import Login from './pages/public/login/Login';
import Register from './pages/public/register/Register';
import OAuthCallback from './pages/public/login/OAuthCallback';
import Dashboard from './pages/dashboard/Dashboard';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  return <PublicLayout>{children}</PublicLayout>;
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};


const UserRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};


const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
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
              <Register></Register>
            </PublicRoute>
          }
        />

        <Route path="/auth/callback" element={<OAuthCallback />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ThemeProvider>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ThemeProvider>

            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <UserRoute>
              <ThemeProvider>
                <DashboardLayout>
                  <div>Transactions Page Coming Soon</div>
                </DashboardLayout>
              </ThemeProvider>
            </UserRoute>
          }
        />

        <Route
          path="/budgets"
          element={
            <UserRoute>
              <ThemeProvider>
                <DashboardLayout>
                  <div>Budgets Page Coming Soon</div>
                </DashboardLayout>
              </ThemeProvider>
            </UserRoute>
          }
        />

        <Route
          path="/users"
          element={
            <AdminRoute>
              <ThemeProvider>
                <DashboardLayout>
                  <div>Users Page Coming Soon</div>
                </DashboardLayout>
              </ThemeProvider>
            </AdminRoute>
          }
        />


        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register></Register>} />
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