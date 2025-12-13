

// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import JobCard from '../../components/JobCard';

// const DashboardHome = () => {
//   const { user, logout } = useAuth();

//   const userEmail = user?.email || 'guest@jobtracker.local';
//   const storageKey = `jobs_${userEmail}`;

//   const [jobs, setJobs] = useState([]);
//   const [newJob, setNewJob] = useState({
//     title: '',
//     company: '',
//     status: 'Applied',
//   });

//   const [loaded, setLoaded] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('All');

//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(storageKey);
//       if (raw) {
//         const parsed = JSON.parse(raw);
//         setJobs(Array.isArray(parsed) ? parsed : []);
//       } else {
//         setJobs([]);
//       }
//     } catch (err) {
//       console.error('[Dashboard] error loading jobs:', err);
//       setJobs([]);
//     } finally {
//       setLoaded(true);
//     }
//   }, [storageKey]);

//   useEffect(() => {
//     if (!loaded) return;
//     try {
//       localStorage.setItem(storageKey, JSON.stringify(jobs));
//     } catch (err) {
//       console.error('[Dashboard] error saving jobs:', err);
//     }
//   }, [jobs, storageKey, loaded]);

//   const addJob = (e) => {
//     e.preventDefault();
//     if (!newJob.title.trim() || !newJob.company.trim()) return;
//     const job = {
//       id: Date.now(),
//       title: newJob.title.trim(),
//       company: newJob.company.trim(),
//       status: newJob.status,
//     };
//     setJobs((prev) => [...prev, job]);
//     setNewJob({ title: '', company: '', status: 'Applied' });
//   };

//   const handleDelete = (id) =>
//     setJobs((prev) => prev.filter((j) => j.id !== id));

//   const handleEdit = (id, updatedJob) => {
//     setJobs((prev) => prev.map((j) => (j.id === id ? updatedJob : j)));
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   // ✅ Combined search + filter logic
//   const filteredJobs = jobs.filter((job) => {
//     const matchesSearch =
//       job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       job.company.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesStatus = filterStatus === 'All' || job.status === filterStatus;

//     return matchesSearch && matchesStatus;
//   });

//   const clearFilters = () => {
//     setSearchTerm('');
//     setFilterStatus('All');
//   };

//   const clearAllJobs = () => {
//     if (window.confirm('Are you sure you want to delete all jobs?')) {
//       setJobs([]);
//       localStorage.removeItem(storageKey);
//     }
//   };

//   // ✅ Export jobs (filtered) to CSV
//   const exportToCSV = () => {
//     if (filteredJobs.length === 0) {
//       alert('No jobs available to export.');
//       return;
//     }

//     const headers = ['ID', 'Title', 'Company', 'Status'];
//     const rows = filteredJobs.map((job) => [
//       job.id,
//       job.title,
//       job.company,
//       job.status,
//     ]);

//     let csvContent =
//       'data:text/csv;charset=utf-8,' +
//       [headers, ...rows].map((e) => e.join(',')).join('\n');

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.setAttribute('href', encodedUri);
//     link.setAttribute('download', 'jobs.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // ✅ Import jobs from CSV
//   const importFromCSV = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const text = e.target.result;
//       const rows = text.split('\n').map((r) => r.split(','));

//       const [headers, ...dataRows] = rows;

//       const importedJobs = dataRows
//         .filter((r) => r.length >= 4)
//         .map((r) => ({
//           id: parseInt(r[0]) || Date.now() + Math.random(),
//           title: r[1]?.trim() || 'Untitled',
//           company: r[2]?.trim() || 'Unknown',
//           status: r[3]?.trim() || 'Applied',
//         }));

//       if (importedJobs.length > 0) {
//         setJobs((prev) => [...prev, ...importedJobs]);
//         alert(`${importedJobs.length} jobs imported successfully!`);
//       } else {
//         alert('No valid jobs found in CSV.');
//       }
//     };

//     reader.readAsText(file);
//     event.target.value = '';
//   };

//   // ✅ Download sample CSV template
//   const downloadSampleCSV = () => {
//     const headers = ['ID', 'Title', 'Company', 'Status'];
//     const sampleData = [
//       [Date.now(), 'Frontend Developer', 'TechCorp', 'Applied'],
//       [Date.now() + 1, 'Backend Engineer', 'CodeLabs', 'Interview'],
//     ];

//     let csvContent =
//       'data:text/csv;charset=utf-8,' +
//       [headers, ...sampleData].map((e) => e.join(',')).join('\n');

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.setAttribute('href', encodedUri);
//     link.setAttribute('download', 'sample_jobs.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       <header className="bg-white shadow-md p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-blue-600">
//           Job Tracker Dashboard
//         </h1>
//         <div className="text-sm text-gray-600">{user?.name || userEmail}</div>
//       </header>

//       <main className="flex-1 p-6">
//         <h2 className="text-2xl font-semibold mb-4">
//           Your Jobs ({filteredJobs.length})
//         </h2>

//         {/* Add Job Form */}
//         <form
//           onSubmit={addJob}
//           className="bg-white p-4 rounded shadow mb-6 flex gap-2 flex-wrap"
//         >
//           <input
//             value={newJob.title}
//             onChange={(e) =>
//               setNewJob((s) => ({ ...s, title: e.target.value }))
//             }
//             placeholder="Job Title"
//             className="border p-2 flex-1 rounded"
//             required
//           />
//           <input
//             value={newJob.company}
//             onChange={(e) =>
//               setNewJob((s) => ({ ...s, company: e.target.value }))
//             }
//             placeholder="Company"
//             className="border p-2 flex-1 rounded"
//             required
//           />
//           <select
//             value={newJob.status}
//             onChange={(e) =>
//               setNewJob((s) => ({ ...s, status: e.target.value }))
//             }
//             className="border p-2 rounded"
//           >
//             <option value="Applied">Applied</option>
//             <option value="Interview">Interview</option>
//             <option value="Offer">Offer</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Add Job
//           </button>
//         </form>

//         {/* Search + Filter + Actions */}
//         <div className="flex gap-4 mb-6 flex-wrap items-center">
//           <input
//             type="text"
//             placeholder="Search by title or company..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border p-2 rounded flex-1"
//           />
//           <select
//             value={filterStatus}
//             onChange={(e) => setFilterStatus(e.target.value)}
//             className="border p-2 rounded"
//           >
//             <option value="All">All Status</option>
//             <option value="Applied">Applied</option>
//             <option value="Interview">Interview</option>
//             <option value="Offer">Offer</option>
//             <option value="Rejected">Rejected</option>
//           </select>
//           <button
//             onClick={clearFilters}
//             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//           >
//             Clear Filters
//           </button>
//           <button
//             onClick={clearAllJobs}
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//           >
//             Clear All Jobs
//           </button>
//           <button
//             onClick={exportToCSV}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Export CSV
//           </button>
//           {/* Import CSV */}
//           <label className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 cursor-pointer">
//             Import CSV
//             <input
//               type="file"
//               accept=".csv"
//               onChange={importFromCSV}
//               className="hidden"
//             />
//           </label>
//           {/* Download Sample CSV */}
//           <button
//             onClick={downloadSampleCSV}
//             className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
//           >
//             Download Sample CSV
//           </button>
//         </div>

//         {/* Jobs List */}
//         <div className="grid gap-4">
//           {filteredJobs.length === 0 ? (
//             <p className="text-gray-600">No jobs match your search/filter.</p>
//           ) : (
//             filteredJobs.map((job) => (
//               <JobCard
//                 key={job.id}
//                 job={job}
//                 onDelete={handleDelete}
//                 onEdit={handleEdit}
//               />
//             ))
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardHome;



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

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setJobs(Array.isArray(parsed) ? parsed : []);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error('Error loading jobs:', err);
      setJobs([]);
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(jobs));
    } catch (err) {
      console.error('Error saving jobs:', err);
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

  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const handleUpdate = (id, updatedJob) => {
    setJobs((prev) => prev.map((job) => (job.id === id ? updatedJob : job)));
  };

  const handleLogout = () => {
    logout();
  };

  // CSV Import
  const importCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
      const importedJobs = lines.slice(1).map((line) => {
        const [title, company, status] = line.split(',');
        return {
          id: Date.now() + Math.random(),
          title: title?.trim() || 'Untitled',
          company: company?.trim() || 'Unknown',
          status: ['Applied', 'Interview', 'Offer', 'Rejected'].includes(
            status?.trim()
          )
            ? status.trim()
            : 'Applied',
        };
      });
      setJobs((prev) => [...prev, ...importedJobs]);
    };
    reader.readAsText(file);
  };

  // CSV Export sample
  const exportSampleCSV = () => {
    const sample = 'title,company,status\nSoftware Engineer,Google,Applied';
    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_jobs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filtering
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? job.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          Job Tracker Dashboard
        </h1>
        <div className="text-sm text-gray-600">{user?.name || userEmail}</div>
      </header>

      {/* Main */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Your Jobs ({filteredJobs.length})
        </h2>

        {/* Add Job Form */}
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

        {/* Filters */}
        <div className="flex gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Search by title or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 flex-1 rounded"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <button
            onClick={() => {
              setSearch('');
              setStatusFilter('');
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>

        {/* CSV Import / Export + Tooltip */}
        <div className="flex gap-4 mb-6 items-center">
          <input
            type="file"
            accept=".csv"
            onChange={importCSV}
            className="border p-2 rounded"
          />

          <button
            onClick={exportSampleCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Sample CSV
          </button>

          {/* Tooltip Section */}
          <div className="relative group">
            <span className="cursor-pointer text-blue-600 font-bold">ℹ️</span>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-gray-800 text-white text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              Valid statuses are:
              <ul className="list-disc list-inside">
                <li>Applied</li>
                <li>Interview</li>
                <li>Offer</li>
                <li>Rejected</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid gap-4">
          {filteredJobs.length === 0 ? (
            <p className="text-gray-600">No jobs found.</p>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
