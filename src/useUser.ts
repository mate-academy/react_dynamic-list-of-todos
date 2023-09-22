import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getUser } from './api';

export const useUser = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUser(userId).then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, [userId]);

  return { user, isLoading };
};
