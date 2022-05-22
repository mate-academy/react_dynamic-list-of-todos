import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

type Props = {
  userId: number,
  clear: () => void,
};

export const CurrentUser: React.FC<Props> = ({
  userId,
  clear,
}) => {
  const [user, setUser] = useState<User>();

  const loadUser = async () => {
    const newUser = await getUser(`/users/${userId}`);

    setUser(newUser);
  };

  useEffect(() => {
    loadUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user && (
        <>
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user.id}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <div className="CurrentUser__clear">
            <button
              type="button"
              className="CurrentUser__clear-button"
              onClick={clear}
            >
              Clear
            </button>
          </div>
        </>
      )}
    </div>
  );
};
