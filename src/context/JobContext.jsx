import { createContext, useContext, useEffect, useState } from 'react';

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem('jobtracker_jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jobtracker_jobs', JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs([...jobs, { ...job, id: Date.now() }]);
  };

  const updateJob = (id, updatedJob) => {
    setJobs(
      jobs.map((job) => (job.id === id ? { ...job, ...updatedJob } : job))
    );
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => useContext(JobContext);
