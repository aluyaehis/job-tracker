export default function JobCard({ job, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>

      {job.link && (
        <a
          href={job.link}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline text-sm"
        >
          {' '}
          View Job Posting{' '}
        </a>
      )}
      <p className="mt-2">
        <span className="font-medium">Status:</span>
        {job.status}
      </p>

      {job.date && (
        <p>
          <span className="font-medium">Applied on:</span>
          {job.date}
        </p>
      )}

      {job.notes && <p className="text-gray-700 mt-2">{job.notes}</p>}

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onEdit(job)}
          className="bg-yellow-500 text-white px-3 py-1 rounded-sm hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(job.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
