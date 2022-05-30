import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { User } from '../../types/User';
import './CurrentUser.scss';

interface Props {
  selectedUserId: number,
  setSelectedUserId: (id: number) => void,
}

export const CurrentUser: React.FC<Props> = React.memo(({
  selectedUserId,
  setSelectedUserId,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const loadUser = async () => {
    const userFromServer = await getUser(selectedUserId);

    setCurrentUser(userFromServer);
  };

  useEffect(() => {
    loadUser();
  }, [selectedUserId]);

  return (
    <>
      {currentUser && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${selectedUserId}`}</span>
          </h2>

          <h3 className="CurrentUser__name" data-cy="userName">
            {currentUser.name}
          </h3>

          <p className="CurrentUser__email">
            {currentUser.email}
          </p>

          <p className="CurrentUser__phone">
            {currentUser.phone}
          </p>

          <button
            type="button"
            onClick={() => setSelectedUserId(0)}
            className="CurrentUser__clear button"
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
});
