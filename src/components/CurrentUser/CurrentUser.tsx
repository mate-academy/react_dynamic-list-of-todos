import React, { useEffect, useState } from 'react';
import { request } from '../../api';
import { CurrentUserProps, User } from '../../types/types';
import './CurrentUser.scss';

export const CurrentUser: React.FC<CurrentUserProps> = ({ selectedUserId }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    request('users')
      .then(usersFromServer => {
        setUsers(usersFromServer);
      });
  }, []);

  const user = users.find(selectedUser => selectedUserId === selectedUser.id);

  return user ? (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {user.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
    </div>
  ) : (
    <p>
      loading...
    </p>
  );
};
