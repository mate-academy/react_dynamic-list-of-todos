import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

interface Props {
  selectedUserId: number;
  selectHandler: (userId: number) => void;
}

export const CurrentUser: React.FC<Props> = (
  {
    selectedUserId,
    selectHandler,
  },
) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const loadedUser = await getUser(selectedUserId);

      setUser(loadedUser);
    })();
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {selectedUserId}
        </span>
      </h2>

      <h3
        className="CurrentUser__name"
        data-cy="userName"
      >
        {user?.username}
      </h3>
      <p className="CurrentUser__email">
        {user?.email}
      </p>
      <p className="CurrentUser__phone">
        {user?.phone}
      </p>

      <button
        type="button"
        onClick={() => selectHandler(0)}
      >
        Clear
      </button>
    </div>
  );
};
