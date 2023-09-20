import { useEffect, useState } from 'react';
import { getUser } from './api';
import { User } from './types/User';

export const useUser = (userId: number) => {
  const [chosenUser, setChosenUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    getUser(userId)
      .then((data) => {
        setChosenUser(data);
        setIsLoading(false);
      });
  }, [userId]);

  return { chosenUser, isLoading };
};
