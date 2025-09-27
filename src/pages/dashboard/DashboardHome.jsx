// import React from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const DashboardHome = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Navbar */}
//       <header className="bg-white shadow-md p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-blue-600">
//           Job Tracker Dashboard
//         </h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 text-white px-4 py-2 rounded-sm hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </header>

//       <main className="flex-1 p-6">
//         <h2 className="text-2xl font-semibold mb-4">
//           Welcome back, {user?.name || user?.email} 👋
//         </h2>

//         <div className="bg-white rounded-xl shadow p-6">
//           <p className="text-gray-600">
//             This is your dashboard. Soon you'll see your saved job applications,
//             notes and tasks here.
//           </p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardHome;


import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Local job state (later this can be replaced with backend API or Firebase)
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Google',
      status: 'Applied',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'Amazon',
      status: 'Interview',
    },
  ]);

  const [newJob, setNewJob] = useState({ title: '', company: '', status: '' });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company) return;

    setJobs([
      ...jobs,
      {
        id: Date.now(),
        title: newJob.title,
        company: newJob.company,
        status: newJob.status || 'Applied',
      },
    ]);

    setNewJob({ title: '', company: '', status: '' });
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome back, {user?.name || user?.email} 👋
        </h2>

        {/* Add Job Form */}
        <form
          onSubmit={handleAddJob}
          className="bg-white p-4 rounded-lg shadow mb-6 flex gap-2"
        >
          <input
            type="text"
            placeholder="Job Title"
            className="border p-2 flex-1 rounded"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Company"
            className="border p-2 flex-1 rounded"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            required
          />
          <select
            className="border p-2 rounded"
            value={newJob.status}
            onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {/* Job List */}
        <div className="grid gap-4">
          {jobs.length === 0 ? (
            <p className="text-gray-500">No jobs added yet.</p>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    job.status === 'Applied'
                      ? 'bg-blue-100 text-blue-700'
                      : job.status === 'Interview'
                      ? 'bg-yellow-100 text-yellow-700'
                      : job.status === 'Offer'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {job.status}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
