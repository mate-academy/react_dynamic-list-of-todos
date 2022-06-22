import React, { useEffect, useState } from 'react';
import { getUserID } from '../../api';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

interface Props {
  userID: number,
  newUserSelected: (id: number) => void,
}

export const CurrentUser: React.FC<Props> = ({ userID, newUserSelected }) => {
  const [userInfo, setUserInfo] = useState<User | null>();

  useEffect(() => {
    getUserID(userID)
      .then(response => setUserInfo(response))
      .catch(() => {
        newUserSelected(0);
        setUserInfo(null);
      });
  }, [userID]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${userID}`}
        </span>

      </h2>

      <h3 className="CurrentUser__name">
        {userInfo?.name}
      </h3>
      <p className="CurrentUser__phone">
        {userInfo?.phone}
      </p>
      <p className="CurrentUser__email">
        {userInfo?.email}
      </p>

      <button
        type="button"
        onClick={() => {
          newUserSelected(0);
        }}
      >
        Clear
      </button>

    </div>
  );
};
