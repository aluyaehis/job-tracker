import { useState } from 'react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords does not match');
      return;
    }

    setError('');
    setSuccess(true);
};

    if (success) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-xl shadow-md w-96 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Password Reset Successful
            </h2>
            <p className="text-gray-600">
              Your password has been updated. You can now log in with your new
              password.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4 p-2 text-center">Reset Password</h2>

          {error && <p className="text-red-600 font-medium">{error}</p>}

          <input
            type="password"
            placeholder="New Password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-xl mb-3 p-2"
          />

          <input
            type="password"
            placeholder="Confirm New Password:"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border rounded-xl mb-3 p-2"
          />

          <button type="submit" className='w-full bg-green-600 text-white hover:bg-green-700 p-2 rounded-xl'>Reset Password</button>
        </form>
      </div>
    );
};

export default ResetPassword;
