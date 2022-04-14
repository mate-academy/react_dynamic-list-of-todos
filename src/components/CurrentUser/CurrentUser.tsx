import React, {
  Dispatch, SetStateAction,
  useEffect, useState,
} from 'react';

import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  setCurrentUserId: Dispatch<SetStateAction<number>>
  userId: number,
};

export const CurrentUser: React.FC<Props> = ({
  userId, setCurrentUserId,
}) => {
  const [user, setUser] = useState<User | null>();

  const fetchUser = async () => {
    const res = await getUser(userId);

    setUser(res);
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <>
      {userId === user?.id && (
        <>
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {' '}
                {userId}
              </span>
            </h2>

            <h3 className="CurrentUser__name">
              {user?.name}
            </h3>
            <p className="CurrentUser__email">{user?.email}</p>
            <p className="CurrentUser__phone">{user?.phone}</p>

          </div>
          <button
            type="button"
            onClick={() => {
              setUser(null);
              setCurrentUserId(0);
            }}
          >
            Clear
          </button>
        </>
      )}
    </>
  );
};
