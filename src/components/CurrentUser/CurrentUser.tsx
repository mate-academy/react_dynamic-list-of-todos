import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  chooseUser: (userId: number) => void;
  currentUserId: number;
};

export const CurrentUser: React.FC<Props> = ({ currentUserId, chooseUser }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(currentUserId)
      .then(newUser => setUser(newUser));
  }, [currentUserId]);

  return (
    <>
      {user && (
        <>
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                {`Selected user: ${user.id}`}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>

          <button
            type="button"
            className="CurrentUser__clearButton"
            onClick={() => chooseUser(0)}
          >
            Clean User
          </button>
        </>
      )}
    </>
  );
};
