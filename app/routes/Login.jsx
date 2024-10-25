// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CallFor from '~/utilities/CallFor'
// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [roleId, setRoleId] = useState(''); // Default to Admin
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

    

//     // Mock login logic, storing data in localStorage
//     localStorage.setItem('remixdata', JSON.stringify({ email, password, roleId }));


//     if (roleId == '1') {
//       navigate('/admin/dashboard');
//     } else if (roleId == '2') {
//       navigate('/station/dashboard');
//     } else if (roleId == '3') {
//       navigate('/warehouse/dashboard');
//     }

//     // Redirect to dashboard after login
//     // navigate('/dashboard');
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="roleId" className="block text-sm font-medium text-gray-700">Role</label>
//             <select
//               id="roleId"
//               value={roleId}
//               onChange={(e) => setRoleId(e.target.value)}
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             >
//               <option value="1">Admin</option>
//               <option value="2">Station</option>
//               <option value="3">Warehouse</option>
//             </select>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//         <p className="text-sm text-center text-gray-600">
//           Don't have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
