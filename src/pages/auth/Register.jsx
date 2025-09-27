// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await register(name, email, password);
//       navigate('/dashboard');
//     } catch (error) {
//       console.log('Error occued:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

//         <input
//           type="text"
//           placeholder="Name:"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-full mb-3 p-2 border rounded-lg"
//         />

//         <input
//           type="email"
//           placeholder="Email:"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full mb-3 p-2 border rounded-lg"
//         />

//         <input
//           type="password"
//           placeholder="Password:"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="w-full mb-3 p-2 border rounded-lg"
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white border rounded-lg mt-2 p-1.5"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;


import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email); // ✅ calls AuthContext
    navigate('/dashboard'); // ✅ redirect after register
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Enter name"
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
