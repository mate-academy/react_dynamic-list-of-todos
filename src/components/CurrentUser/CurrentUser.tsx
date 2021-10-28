import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

type Props = {
  selectedUserId: number;
  changeUser(id: number): void;
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId, changeUser }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedUserId).then(user => setSelectedUser(user));
  });

  return selectedUser && (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{selectedUser.id ? `Selected user: ${selectedUser.id}` : 'No such user'}</span></h2>

      <h3 className="CurrentUser__name">{selectedUser.name}</h3>
      <p className="CurrentUser__email">{selectedUser.email}</p>
      <p className="CurrentUser__phone">{selectedUser.phone}</p>
      <button
        type="button"
        onClick={() => changeUser(0)}
      >
        Clear
      </button>
    </div>
  );
};
