import React, { useEffect, useState } from 'react';
import { getUsers } from '../API/api';
import './CurrentUser.scss';

interface Props {
  userId: number;
  clearUser: (arg0 : number) => void;
}

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [currentUser, setCurrentUser] = useState<User>();

  async function singleUser(id : number) {
    const result = await getUsers();

    setCurrentUser(result.find((el : User) => el.id === id));
  }

  useEffect(() => {
    singleUser(userId);
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${currentUser?.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{currentUser?.name}</h3>
      <p className="CurrentUser__email">{currentUser?.email}</p>
      <p className="CurrentUser__phone">{currentUser?.phone}</p>
      <button
        type="button"
        onClick={() => clearUser(0)}
      >
        Clear
      </button>
    </div>
  );
};
