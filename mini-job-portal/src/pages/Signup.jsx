import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../app/slices/authSlice';

export default function Signup() {
  const [name, setName] = useState('');
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

  const handleSignup = (e) => {
    e.preventDefault();

    const existingUser = JSON.parse(localStorage.getItem('jobPortalUser'));

    if (existingUser && existingUser.email === email) {
      setError('Account already exists. Please log in instead.');
      return;
    }

    const newUser = { name, email, password };
    localStorage.setItem('jobPortalUser', JSON.stringify(newUser));
    localStorage.setItem('isAuthenticated', 'true');
    setError('');
    dispatch(login(newUser));
    navigate('/dashboard'); // Optional because useEffect will also redirect
  };


  return (
    <div className="min-h-screen bg-[#011c0d] flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <div>
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F5F5DC] hover:bg-yellow-200 text-black font-bold py-2 px-4 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="text-red-300 text-center mt-4">{error}</p>}
        <p className="text-center text-sm text-white mt-4">
          Already have an account?{' '}
          <Link to="/" className="text-yellow-300 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
