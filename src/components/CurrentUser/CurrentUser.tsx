import React, { useEffect, useState } from 'react';

import './CurrentUser.scss';

import { getUser } from '../../api';

interface Props {
  userId: number;
  onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CurrentUser: React.FC<Props> = ({ userId, onButtonClick }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const loadData = async () => {
    setIsError(false);
    setIsLoading(true);
    await getUser(userId)
      .then(response => setUser(response))
      .catch(() => setIsError(true));
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  return (
    <>
      {isError
        ? (<h2>Could not get user info</h2>)
        : (
          <div className="CurrentUser">
            {isLoading
              ? (<h2>Loading</h2>)
              : (
                <>
                  <div className="CurrentUser__user">
                    <h2 className="CurrentUser__title">
                      <span>{`Selected user: ${user?.id}`}</span>
                    </h2>

                    <h3
                      className="CurrentUser__name"
                      data-cy="userName"
                    >
                      {user?.name}
                    </h3>
                    <p className="CurrentUser__email">{user?.email}</p>
                    <p className="CurrentUser__phone">{user?.phone}</p>
                  </div>

                  <div className="CurrentUser__clear">
                    <button
                      type="button"
                      value={0}
                      onClick={onButtonClick}
                    >
                      Clear
                    </button>
                  </div>
                </>
              )}
          </div>
        )}
    </>
  );
};

export default React.memo(CurrentUser);
