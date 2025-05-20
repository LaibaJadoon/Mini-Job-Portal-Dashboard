import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../app/slices/authSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
// Reads isAuthenticated value from Redux store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('jobPortalUser'));

    if (!savedUser) {
      setError("You don't have an account, create one first.");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      setError('');
      dispatch(login(savedUser));
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard'); // Optional because useEffect will also redirect
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };




  return (
    <div className="min-h-screen bg-[#011c0d] flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#F5F5DC] mb-6 text-center">Login to Your Account</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[#F5F5DC] mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-[#F5F5DC] mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F5F5DC] hover:bg-[#e8e8c4] text-black font-bold py-2 px-4 rounded-lg transition"
          >
            Log In
          </button>
        </form>
        {error && <p className="text-red-300 text-center mt-4">{error}</p>}
        <p className="text-center text-sm text-[#F5F5DC] mt-4">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-yellow-300 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );

}