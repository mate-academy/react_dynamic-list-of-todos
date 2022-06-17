import React, { useState, useEffect } from 'react';
import { getUser } from '../../api/api';
import { User } from '../../types/User';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  onClear: CallableFunction,
};

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  onClear,
}) => {
  const [currentUser, setCurrentUser] = useState<User>();

  const loadUser = async () => {
    try {
      return setCurrentUser(
        await getUser(selectedUserId),
      );
    } catch {
      return setCurrentUser(
        {
          id: 0, name: '', phone: '', email: '',
        },
      );
    }
  };

  useEffect(() => {
    loadUser();
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {currentUser?.id === 0 ? (
        <>
          <h2 className="CurrentUser__title">
            <span>
              {'Selected user: '}
              {selectedUserId}
            </span>
          </h2>

          <h2 className="CurrentUser__title">
            <span className="CurrentUser__load-error">
              No user data
            </span>
          </h2>
        </>
      ) : (
        <>
          <h2 className="CurrentUser__title">
            <span>
              {'Selected user: '}
              {selectedUserId}
            </span>
          </h2>

          <h3
            className="CurrentUser__name"
            data-cy="userName"
          >
            {currentUser?.name}
          </h3>
          <p
            className="CurrentUser__email"
          >
            {currentUser?.email}
          </p>
          <p
            className="CurrentUser__phone"
          >
            {currentUser?.phone}
          </p>
        </>
      )}

      <button
        type="button"
        className="CurrentUser__clear button"
        onClick={() => onClear()}
      >
        Clear user
      </button>
    </div>
  );
};
