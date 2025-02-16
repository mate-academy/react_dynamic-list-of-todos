import { useState, useEffect } from 'react';

import { User } from '../types/User';
import { getUser } from '../api';

export const useUser = (userId: number): [User | null, boolean] => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .finally(() => setLoadingUser(false));
  }, [userId]);

  return [user, loadingUser];
};
