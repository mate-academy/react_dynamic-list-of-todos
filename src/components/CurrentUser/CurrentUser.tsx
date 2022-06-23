import React, { useEffect, useState } from 'react';
import { findUser } from '../../api/api';
import { UserType } from '../../types/UserType';
import './CurrentUser.scss';

interface Props {
  userId: number,
  deleteUser: () => void
}

export const CurrentUser: React.FC<Props> = ({ userId, deleteUser }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const [userErr, setUserErr] = useState(false);

  const getUser = async () => {
    try {
      const neededUser = await findUser(userId);

      if (neededUser) {
        setUser(neededUser);
        setUserErr(false);
      }
    } catch (error: any) {
      setUserErr(true);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      {!userErr ? (
        <>
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {user?.id}
            </span>
          </h2>
          <h3 className="CurrentUser__name">{user?.name}</h3>
          <p className="CurrentUser__email">{user?.email}</p>
          <p className="CurrentUser__phone">{user?.phone}</p>
          <button
            type="button"
            onClick={deleteUser}
          >
            Remove
          </button>
        </>
      )
        : <p>Cannot find user</p>}
    </div>
  );
};
