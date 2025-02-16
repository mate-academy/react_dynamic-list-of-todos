import { useEffect, useState } from 'react';
import { getUser } from '../../../api';
import { User } from '../../../types/User';

export const useUser = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .catch(() => alert('Could not load the todos'))
      .finally(() => setIsLoading(false));
  }, []);

  return { user, isLoading };
};
