import { useEffect, useState } from 'react';
import { getUser } from '../api';

import { User } from '../types/User';

const localCache: User[] = [];

export const useUser = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const fetchedUser = await getUser(userId);

      setUser(fetchedUser);
      localCache.push(fetchedUser);
    };

    const cachedUser = localCache.find(elem => elem.id === userId);

    if (cachedUser) {
      setUser(cachedUser);
    } else {
      loadUser();
    }
  }, [userId]);

  return user;
};
