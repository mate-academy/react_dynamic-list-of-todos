import { useState, useEffect } from 'react';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const useTodoModal = (todoId: number | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (todoId !== null) {
        const userData = await getUser(todoId);

        setUser(userData);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [todoId]);

  return { user, isLoading };
};
