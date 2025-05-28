import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../app/slices/authSlice';
import { setCurrentUserEmail as setBookmarksUserEmail } from '../app/slices/bookmarksSlice';
import { setCurrentUserEmail as setAppliedJobsUserEmail } from '../app/slices/appliedJobsSlice';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Helper to get users array from localStorage
  const getUsers = () => {
    const usersData = localStorage.getItem('jobPortalUsers');
    return usersData ? JSON.parse(usersData) : [];
  };

  // Helper to save users array to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('jobPortalUsers', JSON.stringify(users));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|\\:;"'<>,.?/]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.');
      return;
    }

    const users = getUsers();

    // Check if email already exists
    const existingUser = users.find(user => user.email === normalizedEmail);
    if (existingUser) {
      setError('Account already exists. Please log in instead.');
      return;
    }

    const newUser = { name, email: normalizedEmail, password };
    users.push(newUser);
    saveUsers(users);

    // Save current logged in user email separately
    localStorage.setItem('currentUserEmail', normalizedEmail);
    localStorage.setItem('isAuthenticated', 'true');
    setError('');

    dispatch(login(newUser));
    dispatch(setBookmarksUserEmail(normalizedEmail));   // set user email for bookmarks
    dispatch(setAppliedJobsUserEmail(normalizedEmail));  // set user email for applied jobs

    navigate('/dashboard'); 
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