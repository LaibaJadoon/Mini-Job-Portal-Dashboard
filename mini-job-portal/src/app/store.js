import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import jobsReducer from './slices/jobsSlice';
import bookmarksReducer from './slices/bookmarksSlice';
import appliedJobsReducer from './slices/appliedJobsSlice';

let savedUser = null;
try {
  const userFromStorage = localStorage.getItem('jobPortalUser');
  if (userFromStorage) {
    savedUser = JSON.parse(userFromStorage);
  }
} catch (error) {
  console.error('Failed to parse user from localStorage:', error);
  savedUser = null;
}

const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

// Fix inconsistency: if no user, force isAuthenticated to false
const authPreloadedState = {
  user: savedUser,
  isAuthenticated: savedUser && isAuthenticated ? true : false,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    bookmarks: bookmarksReducer,
    appliedJobs: appliedJobsReducer,
  },
  preloadedState: {
    auth: authPreloadedState,
  },
});
