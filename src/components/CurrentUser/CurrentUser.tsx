import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../../api/api';
import { User } from '../../types/User';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  removeUser: (selectedUserId: number) => void;
};

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  removeUser,
}) => {
  const [userDetail, setUserDetail] = useState<User>();

  useEffect(() => {
    getUserDetails(selectedUserId)
      .then((data) => setUserDetail(data));
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {userDetail && (
        <>
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${userDetail.id}`}
            </span>
          </h2>

          <h3 className="CurrentUser__name">
            {userDetail.name}
          </h3>
          <p className="CurrentUser__email">
            {userDetail.email}
          </p>
          <p className="CurrentUser__phone">
            {userDetail.phone}
          </p>

          <button
            type="button"
            className="CurrentUser__clear button"
            onClick={() => removeUser(selectedUserId)}
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
};
