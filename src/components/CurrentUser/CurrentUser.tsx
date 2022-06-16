import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  onClear: () => void;
};

export const CurrentUser: React.FC <Props> = ({ selectedUserId, onClear }) => {
  const userId = selectedUserId;
  const urlUser = `https://mate.academy/students-api/users/${userId}`;

  const [user, setUser] = useState(
    {
      id: 0, name: '', email: '', phone: '',
    },
  );

  useEffect(() => {
    fetch(urlUser)
      .then(response => {
        if (!response.ok) {
          setUser({
            id: 0, name: '', email: '', phone: '',
          });
          throw new Error('user not found');
        } else {
          response.json()
            .then(userFromServer => {
              setUser(userFromServer);
            });
        }
      });
  }, [userId]);

  return (
    <div className="CurrentUser">
      {user.id === 0 && user.name === ''
      && user.email === '' && user.phone === '' ? ('User not found') : (
          // eslint-disable-next-line react/jsx-indent
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

            <h3
              className="CurrentUser__name"
              data-cy="userName"
            >
              {user.name}
            </h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <h3>
              <button
                type="button"
                className="CurrentUser__title button"
                onClick={onClear}
              >
                Clear
              </button>
            </h3>
          </>
        )}
    </div>
  );
};
