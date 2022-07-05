import React, { useCallback, useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  userId: number;
  onSelectHandler: (userId: number) => void;
}

export const CurrentUser: React.FC<Props> = React.memo(
  ({
    userId,
    onSelectHandler,
  }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const selectUser = useCallback(
      async (id: number) => {
        try {
          const selectedUser = await getUser(id);

          if (selectedUser.id) {
            setCurrentUser(selectedUser);
          }
        } catch {
          setCurrentUser(null);
        }
      }, [userId],
    );

    useEffect(() => {
      selectUser(userId);

      return () => setCurrentUser(null); // to clean up previous selected user before new selected user
    },
    [userId]);

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${currentUser?.id}`}</span></h2>

        <h3 className="CurrentUser__name">{currentUser?.name}</h3>
        <p className="CurrentUser__email">{currentUser?.email}</p>
        <p className="CurrentUser__phone">{currentUser?.phone}</p>

        <button
          type="button"
          className="button"
          onClick={() => onSelectHandler(0)}
        >
          Clear
        </button>
      </div>
    );
  },
);
