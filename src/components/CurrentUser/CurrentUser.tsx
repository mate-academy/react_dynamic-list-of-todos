import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { User } from '../../types/user';
import { getUser } from '../../api';

type Callback = () => void;

type Props = {
  userId: number;
  onClearUser: Callback;
};

export const CurrentUser: React.FC<Props> = ({ userId, onClearUser }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId).then(userFS => {
      setUser(userFS);
    });
  }, [userId]);

  return user ? (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${user.id}`}
        </span>
      </h2>

      <h3
        data-cy="userName"
        className="CurrentUser__name"
      >
        {user.name}
      </h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <button
        type="button"
        name="clear"
        className="CurrentUser__button-clear button is-danger"
        onClick={onClearUser}
      >
        Clear
      </button>
    </div>
  ) : (
    <h2 className="CurrentUser__title">
      <span>
        Please try again
      </span>
    </h2>
  );
};
