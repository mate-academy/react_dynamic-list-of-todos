import React, { useCallback, useEffect, useState } from 'react';
import { getUserFromServer } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  onSelect: (id: number) => void
};

export const CurrentUser: React.FC<Props> = ({ userId, onSelect }) => {
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });

  const getUser = useCallback(async (id: number) => {
    const userFromServer = await getUserFromServer(id);

    setUser(userFromServer);
  }, [userId]);

  useEffect(() => {
    getUser(userId);
  }, [userId]);

  return (
    <>
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name" data-cy="userName">
          {user.name}
        </h3>
        <p className="CurrentUser__email">
          {user.email}
        </p>
        <p className="CurrentUser__phone">
          {user.phone}
        </p>
      </div>
      <button
        className="button button__clear"
        type="button"
        onClick={() => {
          onSelect(0);
        }}
      >
        Clear
      </button>
    </>
  );
};
