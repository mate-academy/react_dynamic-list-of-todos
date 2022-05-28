import React, { useCallback, useEffect, useState } from 'react';
import './CurrentUser.scss';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface Props {
  id: number;
  resetUser: () => void;
}

export const CurrentUser: React.FC<Props> = ({
  id,
  resetUser,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const newUser = useCallback(async () => {
    setCurrentUser(await getUser(id));
  }, [id]);

  useEffect(() => {
    newUser();
  }, [id]);

  return (
    <>
      { currentUser && (
        <div className="currentUser">
          <h2 className="currentUser__title">
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>

          <h3 className="currentUser__name" data-cy="userName">
            {currentUser.name}
          </h3>

          <p className="currentUser__email">
            {currentUser.email}
          </p>

          <p className="currentUser__phone">
            {currentUser.phone}
          </p>

          <button
            type="button"
            className="currentUser__clear button"
            onClick={resetUser}
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
};
