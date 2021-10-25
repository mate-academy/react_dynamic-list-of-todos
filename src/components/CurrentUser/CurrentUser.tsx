import React from 'react';
import './CurrentUser.scss';

type User = {
  id: number,
  name: string,
  email: string,
  phone: number,
};

interface Props {
  currentUser: User | null;
  clearSelectedUser: () => void,
}

export const CurrentUser: React.FC<Props> = ({ currentUser, clearSelectedUser }) => {
  return currentUser && (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${currentUser.id}`}</span>
      </h2>
      <h3 className="CurrentUser__name">{currentUser.name}</h3>
      <p className="CurrentUser__email">{currentUser.email}</p>
      <p className="CurrentUser__phone">{currentUser.phone}</p>
      <button
        className="CurrentUser__clear button"
        type="button"
        onClick={clearSelectedUser}
      >
        Hide User
      </button>
    </div>
  );
};
