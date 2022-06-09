import React, { useEffect, useState } from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  clearUser: () => void,
};

type User = {
  id: number,
  name: string,
  email: string,
  phone: string,
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId, clearUser }) => {
  const [user, setUser] = useState<User>();

  const selectedUser = async (userId: number) => {
    const userData = await getUser(userId);

    setUser(userData);
  };

  useEffect(() => {
    selectedUser(selectedUserId);
  }, [selectedUserId]);

  return (
    <div className="CurrentUser" data-cy="userName">
      <button
        type="button"
        className="CurrentUser__clear button"
        onClick={clearUser}
      >
        Clear
      </button>

      {user && (
        <>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
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
        </>
      )}
    </div>
  );
};
