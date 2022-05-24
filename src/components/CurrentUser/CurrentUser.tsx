import React, { useState, useEffect } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number;
  selectUser: (id: number) => void;
};

export const CurrentUser: React.FC<Props> = ({
  userId,
  selectUser,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const getCurrentUser = async (currentUserId: number) => {
    const UserFromServer = await getUser(currentUserId);

    setCurrentUser(UserFromServer);
  };

  useEffect(() => {
    getCurrentUser(userId);
  }, [userId]);

  return (
    <div>
      {currentUser && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${currentUser.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{currentUser.name}</h3>
          <p className="CurrentUser__email">{currentUser.email}</p>
          <p className="CurrentUser__phone">{currentUser.phone}</p>
        </div>
      )}
      <button
        type="button"
        className="CurrentUser__button button"
        onClick={() => selectUser(0)}
      >
        Clear
      </button>
    </div>
  );
};
