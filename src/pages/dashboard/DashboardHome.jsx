import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          Job Tracker Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-700"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome back, {user?.name || user?.email} 👋
        </h2>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-600">
            This is your dashboard. Soon you'll see your saved job applications,
            notes and tasks here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
