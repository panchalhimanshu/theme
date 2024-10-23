import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem('remixdata');
    if (!data) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request with email and password only
      const response = await fetch('http://localhost:3000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',     
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token and user data in sessionStorage  
        sessionStorage.setItem('token', JSON.stringify(data.token));
        sessionStorage.setItem('remixdata', btoa(JSON.stringify(data)));

        // Redirect based on roleid
        const roleId = data.user.roleid;
        if (roleId == '3') {
          navigate('/admin/dashboard');
        } else if (roleId == '4') {
          navigate('/station/dashboard');
        } else if (roleId == '5') {
          navigate('/warehouse/dashboard');
        } else {
          // Handle unexpected roles if needed
          console.log('Unknown role, unable to redirect.');
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
