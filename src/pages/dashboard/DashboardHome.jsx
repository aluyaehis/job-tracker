import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import JobCard from '../../components/JobCard';

const DashboardHome = () => {
  const { user, logout } = useAuth();

  const userEmail = user?.email || 'guest@jobtracker.local';
  const storageKey = `jobs_${userEmail}`;

  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    status: 'Applied',
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('[Dashboard] loading jobs from key:', storageKey);
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setJobs(Array.isArray(parsed) ? parsed : []);
        console.log('[Dashboard] loaded jobs:', parsed);
      } else {
        setJobs([]);
        console.log('[Dashboard] no jobs found for key. initialized []');
      }
    } catch (err) {
      console.error('[Dashboard] error loading jobs:', err);
      setJobs([]);
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) {
      console.log(
        '[Dashboard] skipping save because initial load not finished'
      );
      return;
    }
    try {
      localStorage.setItem(storageKey, JSON.stringify(jobs));
      console.log('[Dashboard] saved jobs to:', storageKey, jobs);
    } catch (err) {
      console.error('[Dashboard] error saving jobs:', err);
    }
  }, [jobs, storageKey, loaded]);

  const addJob = (e) => {
    e.preventDefault();
    if (!newJob.title.trim() || !newJob.company.trim()) return;
    const job = {
      id: Date.now(),
      title: newJob.title.trim(),
      company: newJob.company.trim(),
      status: newJob.status,
    };
    setJobs((prev) => [...prev, job]);
    setNewJob({ title: '', company: '', status: 'Applied' });
  };

  const handleDelete = (id) =>
    setJobs((prev) => prev.filter((j) => j.id !== id));

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          Job Tracker Dashboard
        </h1>
        <div className="text-sm text-gray-600">{user?.name || userEmail}</div>
      </header>

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Your Jobs ({jobs.length})
        </h2>

        <form
          onSubmit={addJob}
          className="bg-white p-4 rounded shadow mb-6 flex gap-2 flex-wrap"
        >
          <input
            value={newJob.title}
            onChange={(e) =>
              setNewJob((s) => ({ ...s, title: e.target.value }))
            }
            placeholder="Job Title"
            className="border p-2 flex-1 rounded"
            required
          />
          <input
            value={newJob.company}
            onChange={(e) =>
              setNewJob((s) => ({ ...s, company: e.target.value }))
            }
            placeholder="Company"
            className="border p-2 flex-1 rounded"
            required
          />
          <select
            value={newJob.status}
            onChange={(e) =>
              setNewJob((s) => ({ ...s, status: e.target.value }))
            }
            className="border p-2 rounded"
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
            Add Job
          </button>
        </form>

        <div className="grid gap-4">
          {jobs.length === 0 ? (
            <p className="text-gray-600">No jobs added yet.</p>
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
                <div className="flex items-center gap-3">
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
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;


