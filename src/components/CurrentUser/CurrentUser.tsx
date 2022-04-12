import React, {
  Dispatch, memo, SetStateAction, useEffect, useState,
} from 'react';
import './CurrentUser.scss';
import { getUser } from '../../API/api';

interface Props {
  userId: number,
  onClick: Dispatch<SetStateAction<number>>,
}

export const CurrentUser: React.FC<Props> = memo(({ userId, onClick }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(userId)
      .then(loadedUser => setUser(loadedUser));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <button
        className="
          CurrentUser__clear
          button
        "
        type="button"
        onClick={() => onClick(0)}
      >
        Clear
      </button>
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${user?.id}`}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
    </div>
  );
});
