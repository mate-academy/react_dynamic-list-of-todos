import { useState, useEffect } from 'react';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const useTodoModal = (todoId: number | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (todoId !== null) {
        try {
          const userData = await getUser(todoId);

          setUser(userData);
          setIsLoading(false);
        } catch (errorMessage) {
          setIsLoading(false);
          setError('Unable to fetch user data. Please try again later.');
        }
      }
    };

    fetchUser();
  }, [todoId]);

  return { user, isLoading, error };
};
