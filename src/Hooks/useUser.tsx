import { useEffect, useState } from 'react';
import { getUser } from '../api';
import { User } from '../types/User';

export const useUser = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { user, isLoading };
};
