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

//budget
import { UserBudget } from './components/budget/BudgetUser';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: 'admin' | 'user' }) => {
  const { user, isFetched } = useSelector((state: RootState) => state.auth);

  if (!isFetched) return <div>Loading...</div>; // Wait for getMe / loginUser
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};




function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isFetched } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isFetched) {
      dispatch(getMe());
    }
  }, [dispatch, isFetched]);


  return (
    <Routes>
      <Route
        path="/login"
        element={<PublicLayout><Login /></PublicLayout>}
      />
      <Route
        path="/register"
        element={<PublicLayout><Register /></PublicLayout>}
      />

      <Route path="/auth/callback" element={<OAuthCallback />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="user">
            <ThemeProvider>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ThemeProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/budgets"
        element={
          <ProtectedRoute role="user">
            <ThemeProvider>
              <DashboardLayout>
                <>
                  <UserBudget />
                </>
              </DashboardLayout>
            </ThemeProvider>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute role="admin">
            <ThemeProvider>
              <DashboardLayout>
                <div>Users Page Coming Soon</div>
              </DashboardLayout>
            </ThemeProvider>
          </ProtectedRoute>
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
