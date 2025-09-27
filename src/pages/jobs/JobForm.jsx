import { useEffect, useState } from 'react';
export default function JobForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('Applied');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCompany(initialData.company || '');
      setLink(initialData.link || '');
      setStatus(initialData.status || '');
      setDate(initialData.date || '');
      setNotes(initialData.notes || '');
    }
  }, [initialData]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, company, link, status, date, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Edit Job' : 'Add New Job'}
      </h2>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded-sm"
      />

      <input
        type="text"
        value={company}
        placeholder="Company"
        onChange={(e) => setCompany(e.target.value)}
        required
        className="w-full mb-3 p-2 border rounded-sm"
      />

      <input
        type="url"
        placeholder="Job Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full mb-3 p-2 rounded-sm border"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full mb-3 p-2 border rounded-sm"
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full mb-3 p-2 border rounded-sm"
      />

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
        className="w-full mb-3 p-2 border rounded-sm"
        rows="3"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700"
        >
          {initialData ? 'Update Job' : 'Add Job'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded-sm hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
