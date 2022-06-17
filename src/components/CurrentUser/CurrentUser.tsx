import React, { Dispatch, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

interface Props {
  selectedUserId: number,
  setSelectedUserId: Dispatch<number>,
}

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  setSelectedUserId,
}) => {
  const [currentUser, setCurrentUser] = useState<User>();

  const gettingUser = async () => {
    try {
      const user = await getUser(selectedUserId);

      setCurrentUser(user);
    } catch (error) {
      setSelectedUserId(0);
    }
  };

  useEffect(() => {
    gettingUser();
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {currentUser === undefined ? (
        <p>Loading...</p>
      )
        : (
          <>
            {currentUser && (
              <>
                <h2 className="CurrentUser__title"><span>{`Selected user: ${currentUser?.id}`}</span></h2>

                <h3 className="CurrentUser__username">
                  {currentUser.username}
                </h3>
                <h2
                  className="CurrentUser__name"
                  data-cy="userName"
                >
                  {currentUser.name}
                </h2>
                <p className="CurrentUser__email">{currentUser.email}</p>
                <p className="CurrentUser__phone">{currentUser.phone}</p>
                <p className="CurrentUser__website">{currentUser.website}</p>
                <p className="CurrentUser__createdAt">
                  {currentUser.createdAt}
                </p>

                <button
                  className="CurrentUser__clear button is-info is-rounded"
                  type="button"
                  onClick={() => (setSelectedUserId(0))}
                >
                  Clear
                </button>
              </>
            )}
          </>
        )}
    </div>
  );
};
