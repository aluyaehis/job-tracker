import { useState } from 'react';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-md w-96 text-center">
          <h2 className="text-2xl font-bold mb-4">Check your email</h2>
          <p className="text-gray-600">
            If an account exists for{' '}
            <span className="font-semibold">{email}</span>, you'll receive a
            password reset link.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 rounded-xl shadow-md bg-white p-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password?</h2>
        <p>Enter your email and we'll send you a reset link</p>

        <input
          type="email"
          placeholder="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border w-full rounded-xl p-2 m-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
