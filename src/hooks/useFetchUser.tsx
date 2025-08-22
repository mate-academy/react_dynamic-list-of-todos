import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { getUser } from '../api';

export const useFetchUser = (userId: number | null) => {
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [fetchError, setFetchError] = useState<string>('');
  const [isUserLoader, setIsUserLoader] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) {
      return;
    }

    let isActive = true;

    setIsUserLoader(true);
    getUser(userId)
      .then(data => {
        if (isActive) {
          setFetchedUser(data);
          setIsUserLoader(false);
        }
      })
      .catch(() => {
        if (isActive) {
          setFetchError('Try again later');
          setIsUserLoader(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [userId]);

  return {
    fetchedUser,
    fetchError,
    isUserLoader,
  };
};
