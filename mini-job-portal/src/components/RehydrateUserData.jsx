import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUserEmail as setBookmarksUserEmail } from '../app/slices/bookmarksSlice';
import { setCurrentUserEmail as setAppliedJobsUserEmail } from '../app/slices/appliedJobsSlice';

export default function RehydrateUserData() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      const normalizedEmail = user.email.trim().toLowerCase();
      dispatch(setBookmarksUserEmail(normalizedEmail));
      dispatch(setAppliedJobsUserEmail(normalizedEmail));
    }
  }, [isAuthenticated, user?.email, dispatch]);

  return null;
}