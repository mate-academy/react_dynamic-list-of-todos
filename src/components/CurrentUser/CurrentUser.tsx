import React, { useEffect, useState } from 'react';
import { getUserById } from '../../api';
import './CurrentUser.scss';
import './loader.css';

interface Props {
  userId: number,
  clearUser: () => void,
}

export const CurrentUser: React.FC<Props> = ({ userId, clearUser }) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  useEffect(() => {
    getUserById(userId)
      .then(data => setSelectedUser(data));
  }, [userId]);

  return (
    <div className="CurrentUser">
      {
        selectedUser ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:&nbsp;
                {selectedUser?.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{selectedUser?.name}</h3>
            <p className="CurrentUser__email">{selectedUser?.email}</p>
            <p className="CurrentUser__phone">{selectedUser?.phone}</p>

            <button
              className="CurrentUser__clear TodoList__user-button--selected
              button"
              type="button"
              onClick={clearUser}
            >
              Clear
            </button>
          </>
        )
          : (
            <div className="lds-ripple">
              <div />
              <div />
            </div>
          )
      }
    </div>
  );
};
