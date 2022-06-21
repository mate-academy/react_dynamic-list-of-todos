import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  selectedUserId: number,
  selectUser: (userId: number) => void,
};

export const CurrentUser: React.FC<Props> = (
  { selectedUserId, selectUser },
) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedUserId)
      .then(setUser);
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {user ? (
        <>
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${user.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            {user.name}
          </h3>
          <p className="CurrentUser__email">
            {user.email}
          </p>
          <p className="CurrentUser__phone">
            {user.phone}
          </p>

          <button
            type="button"
            className="
                TodoList__user-button
                TodoList__user-button--selected
                button"
            onClick={() => {
              selectUser(0);
            }}
          >
            Clear
          </button>
        </>
      ) : (
        'User not found'
      )}
    </div>
  );
};
