import { useState, useEffect } from 'react';
import { getUser } from '../api';
import { User } from '../types/User';

export function useUser(userId: number) {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(setData)
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { data, isLoading } as const;
}
