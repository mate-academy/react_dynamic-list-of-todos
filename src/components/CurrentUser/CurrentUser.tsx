import React, { useEffect, useState } from 'react';
import { getUsersById } from '../../api/api';
import './CurrentUser.scss';

interface Props {
  selectedId: number;
  setClearId: (userId: number) => void;
}

export const CurrentUser: React.FC<Props> = ({ selectedId, setClearId }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUsersById(selectedId)
      .then(data => setUser(data));
  }, [selectedId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${selectedId}`}</span>
      </h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>

      <button
        type="button"
        className="TodoList__user-button button"
        onClick={() => setClearId(0)}
      >
        Clear
      </button>
    </div>
  );
};
