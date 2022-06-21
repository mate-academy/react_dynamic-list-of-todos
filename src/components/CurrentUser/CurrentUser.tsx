import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { User } from '../../react-app-env';
import { getUser } from '../../api/api';

interface Props {
  selectedUserId: number,
  setSelectedUserId: (id: number) => void,
}

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  setSelectedUserId,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedUserId)
      .then(userFromServer => setUser(userFromServer))
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        setUser(null);
        setSelectedUserId(0);
      });
  }, [selectedUserId]);

  if (!user) {
    return (
      <div>user not selected</div>
    );
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${user.id}`}</span>
      </h2>

      <h3 data-cy="userName" className="CurrentUser__name">
        {user.name}
      </h3>
      <p className="CurrentUser__email">
        {user.email}
      </p>
      <p className="CurrentUser__phone">
        {user.phone}
      </p>
      <button
        className="button"
        type="button"
        onClick={() => {
          setSelectedUserId(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};
