import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import DashboardHome from './pages/dashboard/DashboardHome';
import ProtectedRoute from './components/ProtectedRoute';
import JobPage from './pages/jobs/JobPage';

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoute;
