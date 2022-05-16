import React, { useEffect, useState } from 'react';
import { getUserById } from '../../api';
import './CurrentUser.scss';

type UserProps = {
  userId: number,
  clear: () => void,
};

export const CurrentUser: React.FC<UserProps> = ({
  userId, clear,
}) => {
  const [curUser, setCurUser] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
  });
  const [hasLoadingError, setHasLoadingError] = useState(false);

  const loadUser = async (usId: number) => {
    try {
      const user = await getUserById(usId);

      setHasLoadingError(false);

      return user;
    } catch (error) {
      setHasLoadingError(true);

      return error;
    }
  };

  useEffect(() => {
    loadUser(userId).then(user => {
      if (user) {
        setCurUser({
          userName: user.name,
          userEmail: user.email,
          userPhone: user.phone,
        });
      }
    });
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2
        className="CurrentUser__title"
      >
        <span>
          Selected user:
          {` ${userId}`}
        </span>
      </h2>

      {
        !hasLoadingError
          ? (
            <>
              <h3 className="CurrentUser__name">{curUser.userName}</h3>
              <p className="CurrentUser__email">{curUser.userEmail}</p>
              <p className="CurrentUser__phone">{curUser.userPhone}</p>
            </>
          )
          : <p>User information is absent</p>
      }

      <button
        className="ClearUserInfo"
        type="button"
        onClick={clear}
      >
        Clear
      </button>
    </div>
  );
};
