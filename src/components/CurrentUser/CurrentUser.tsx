import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  selectedUserId: number
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId }) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    if (user?.id !== selectedUserId) {
      getUser(selectedUserId)
        .then(setUser)
        .catch(() => {
          // eslint-disable-next-line no-console
          console.log('User not find');
        });
    }
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {user
        ? (
          <>
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user.id}`}</span>
            </h2>

            <h3
              className="CurrentUser__name"
              data-cy="userName"
            >
              {user.name}
            </h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </>
        )
        : (
          'Loading...'
        )}
    </div>
  );
};
