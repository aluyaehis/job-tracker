import { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import JobForm from './JobForm';
import JobCard from '../../components/JobCard';

export default function JobPage() {
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  const [editingJob, setEditingJob] = useState(null);

  const handleAddJob = (job) => {
    addJob(job);
  };

  const handleUpdateJob = (updated) => {
    updateJob(editingJob.id, updated);
    setEditingJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Job Applications</h1>

      <div>
        <JobForm
          onSubmit={editingJob ? handleUpdateJob : handleAddJob}
          initialData={editingJob}
          onCancel={() => setEditingJob(null)}
        />
      </div>
      <div>
        {jobs.length === 0 ? (
          <p>No job yet. Add your first application!</p>
        ) : (
          jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={setEditingJob}
              onDelete={deleteJob}
            />
          ))
        )}
      </div>
    </div>
  );
}
