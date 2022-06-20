import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api';

type Props = {
  selectedUserId:number
  selectIdOfUser: (userId: number) => void
};

// eslint-disable-next-line max-len
export const CurrentUser: React.FC<Props> = ({ selectedUserId, selectIdOfUser }) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    getUsers(selectedUserId)
      .then(userFromServer => setUser(userFromServer));
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {user
        ? (
          <>
            <h2 className="CurrentUser__title">
              <span>{`Selected User: ${user.id}`}</span>
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
          'Please wait'
        )}
      <button
        type="button"
        className="button is-danger"
        onClick={() => {
          selectIdOfUser(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};
