import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { User } from '../../types/type';
import { getUserById } from '../../types/api';

type Props = {
  selectedUserId: number,
  getClear: () => void,
};

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  getClear,
}) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    getUserById(selectedUserId)
      .then(data => setSelectedUser(data));
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {(!selectedUser)
        ? 'Not found user'
        : (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {selectedUserId}
              </span>
            </h2>
            <h3 className="CurrentUser__name">{selectedUser?.name}</h3>
            <p className="CurrentUser__email">{selectedUser?.email}</p>
            <p className="CurrentUser__phone">{selectedUser?.phone}</p>
            <button
              className="button"
              type="button"
              onClick={getClear}
            >
              Clear
            </button>
          </>
        )}
    </div>
  );
};
