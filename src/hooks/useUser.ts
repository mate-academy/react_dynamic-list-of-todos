import { useEffect, useState } from 'react';
import { getUser } from '../api';
import { User } from '../types/User';

export function useUser(userId: number) {
  const [todos, setTodos] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(setTodos)
      .finally(() => setLoading(false));
  }, [userId]);

  return { todos, loading } as const;
}
