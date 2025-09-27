// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () =>{
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         await login(email, password);
//         navigate('/dashboard'); 
//   } catch(error) {
//     console.log('Login failed:', error );
//   }
// };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-grey-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-xl shadow-md w-100"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//         <input
//           type="email"
//           placeholder="email:"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full mb-3 p-2 border rounded-xl"
//         />

//         <input
//           type="password"
//           placeholder="Password:"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className='mb-3 w-full p-2 border rounded-xl'
//         />

//         <button
//           type="submit"
//           className="mb-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 border"
//         >Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;



import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email); // ✅ calls AuthContext
    navigate('/dashboard'); // ✅ redirect after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
