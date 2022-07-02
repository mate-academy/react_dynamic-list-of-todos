import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../apis/api';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

interface CurrentUserProps {
  userId: number;
  onClearSelectedUser: (id: number) => void;
}

export const CurrentUser: React.FC<CurrentUserProps> = (
  { userId, onClearSelectedUser },
) => {
  const [selectedUser, setSelectedUser] = useState<
  User | null | undefined>(null);

  const LoadUser = useCallback(
    async () => {
      // const user = getUser(userId);

      setSelectedUser(await getUser(userId));
    }, [selectedUser],
  );

  useEffect(
    () => {
      LoadUser();

      // return () => setSelectedUser(null);
    },
    [selectedUser],
  );

  return (
    <div className="CurrentUser">
      {
        selectedUser
          ? (
            <>
              <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUser.id}`}</span></h2>

              <h3
                className="CurrentUser__name"
                data-cy="userName"
              >
                {selectedUser.name}
              </h3>
              <p className="CurrentUser__email">{selectedUser.email}</p>
              <p className="CurrentUser__phone">{selectedUser.phone}</p>
              <button
                type="button"
                onClick={() => onClearSelectedUser(0)}
                className="button CurrentUser__clear"
              >
                Clear
              </button>
            </>
          )
          : (
            <p>User loading</p>
          )
      }
    </div>
  );
};
