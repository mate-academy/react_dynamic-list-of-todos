import { useState, useEffect } from 'react';
import { getUser } from '../api';
import { User } from '../types/User';

const useUser = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUser(userId)
      .then(setUser)
      .catch(() => alert(`could not load the user`))
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { user, isLoading };
};

export default useUser;
