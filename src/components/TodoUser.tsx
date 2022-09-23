import React, { useState, useEffect } from 'react';
import { getUser } from '../api';
import { User } from '../types/User';

type Props = {
  userId: number,
};

export const TodoUsers: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(userId).then(callUser => {
      setUser(callUser);
    });
  }, []);

  return (
    <>
      <a href={`mailto:${user?.email}`}>
        {user?.name}
      </a>
    </>
  );
};
