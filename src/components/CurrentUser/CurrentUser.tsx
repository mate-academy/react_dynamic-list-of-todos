import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUserDetail } from '../../api/api';
import loading from '../../image/Spinner-3.gif';

type Props = {
  userId: number,
  setSelectedUserId: (id: number) => void
};

export const CurrentUser: React.FC<Props> = ({ userId, setSelectedUserId }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      getUserDetail(userId).then(userFromServer => setUser(userFromServer));
    } catch {
      setUser({
        id: userId,
        name: 'User not Found',
        email: '',
        phone: NaN,
      });
    }

    setIsLoading(false);
  }, [userId]);

  return (
    <div className="CurrentUser">
      { isLoading
        ? <img src={loading} alt="Loading" width="100px" height="100px" />
        : (user
              && (
                <>
                  <h2 className="CurrentUser__title">
                    <span>
                      Selected user:
                      {' '}
                      {user.id}
                    </span>
                  </h2>

                  <h3 className="CurrentUser__name">{user.name}</h3>
                  <p className="CurrentUser__email">{user.email}</p>
                  <p className="CurrentUser__phone">{user.phone}</p>
                  <button
                    type="button"
                    className="button"
                    style={{ float: 'right' }}
                    onClick={() => setSelectedUserId(0)}
                  >
                    Clear
                  </button>
                </>
              )
        )}
    </div>
  );
};
