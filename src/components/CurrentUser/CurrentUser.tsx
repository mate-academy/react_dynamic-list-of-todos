import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  selectedUserId: (uId: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, selectedUserId }) => {
  const [userMan, setUserMan] = useState<User>({
    name: '',
    phone: 0,
    email: '',
    id: 0,
  });

  useEffect(() => {
    getUser(userId)
      .then(user => {
        setUserMan(user);
      });
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {userMan.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{userMan.name}</h3>
      <p className="CurrentUser__email">{userMan.email}</p>
      <p className="CurrentUser__phone">{userMan.phone}</p>
      <button
        type="button"
        onClick={() => selectedUserId(0)}
      >
        Clear
      </button>
    </div>
  );
};
