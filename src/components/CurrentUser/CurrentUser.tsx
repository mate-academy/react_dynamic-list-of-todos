/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
// import { getUser } from '../../api';
import { BASE_URL } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: User['id'],
};

export const CurrentUser: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>();
  // const [id, setId] = useState<number>(userId);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const result = await getUser(userId);

  //     setUser(result);
  //   };

  //   fetchUser();
  // }, [userId]);

  const getUser = async (endpoint: number) => {
    const response = await fetch(`${BASE_URL}/users/${endpoint}`);
    const data: Promise<User> = await response.json();

    setUser(await data);
  };

  useEffect(() => {
    if (userId) {
      getUser(userId);
    }
  }, [userId]);

  return (
    <>
      {/* {userId === user?.id ? ( */}
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
            }}
          >
            Clear
          </button>
        </>
      // ) : (
      //   <span>No user selected</span>
      )}
    </>
  );
};
