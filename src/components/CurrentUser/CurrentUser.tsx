import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  selectedUserId: number
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (user?.id !== selectedUserId) {
      getUser(selectedUserId)
        .then(setUser);
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
