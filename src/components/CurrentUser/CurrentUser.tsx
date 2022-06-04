import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api/api';
import { User } from '../Types/Types';
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
  const [isError, setIsError] = useState<boolean | null>(null);
  const selectUser = useCallback(async () => {
    try {
      const newCurrentUser = await getUser(selectedUserId);

      setCurrentUser(newCurrentUser);
      setIsError(null);
    } catch (error) {
      setCurrentUser(null);
      setIsError(true);
    }
  }, [selectedUserId]);

  useEffect(() => {
    selectUser();
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {currentUser && (
        <>
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

        </>
      )}

      {isError && (
        <h3>Can&apos;t load user, please try again.</h3>
      )}

      <button
        type="button"
        onClick={() => setSelectedUserId(0)}
        className="CurrentUser__clear button"
      >
        Clear
      </button>
    </div>
  );
});
