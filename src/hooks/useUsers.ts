import { useEffect, useState } from 'react';
import { getUser } from '../api';
import { User } from '../types/User';

export function useUsers(userId: number) {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(setData)
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading } as const;
}
