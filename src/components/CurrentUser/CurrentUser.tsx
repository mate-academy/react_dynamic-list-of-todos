import React, { useEffect, useState } from 'react';
import { getUserById } from '../../api/api';
import './CurrentUser.scss';

interface Props {
  userId: number;
  clearUser: (userId: number) => void;
}

export const CurrentUser: React.FC<Props> = React.memo(
  ({ userId, clearUser }) => {
    const [selectedUser, setSelectedUser] = useState<User>();
    const [isLoaded, setIsLoaded] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      setIsLoaded(false);
      getUserById(userId)
        .then(user => {
          setSelectedUser(user);
          setIsLoaded(true);
          setHasError(false);
        })
        .catch(() => setHasError(true));
    }, [userId]);

    return (
      <div className="CurrentUser">
        {hasError
          ? (
            <div>
              <p className="CurrentUser__error">
                Failed to load user!
              </p>
              <img
                // eslint-disable-next-line max-len
                src="https://blog.ferpection.com/photos/Gif_Humans%20vs%20machines.gif"
                alt="User error"
              />
            </div>
          )
          : (
            <>
              {isLoaded
                ? (
                  <>
                    <h2 className="CurrentUser__title">
                      <span>
                        Selected user:&nbsp;
                        {selectedUser?.id}
                      </span>
                    </h2>

                    <h3 className="CurrentUser__name">{selectedUser?.name}</h3>
                    <p className="CurrentUser__email">{selectedUser?.email}</p>
                    <p className="CurrentUser__phone">{selectedUser?.phone}</p>

                    <button
                      type="button"
                      className="button"
                      onClick={() => clearUser(0)}
                    >
                      Clear
                    </button>
                  </>
                )
                : (
                  <img
                    // eslint-disable-next-line max-len
                    src="https://kharkiv.lexus.ua/wp-content/uploads/AAPL/loaders/One%20Moment%20Please%20Star%20Loader.gif"
                    alt="Loading..."
                  />
                )}
            </>
          )}
      </div>
    );
  },
);
