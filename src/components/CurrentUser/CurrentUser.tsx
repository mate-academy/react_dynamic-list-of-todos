import React from 'react';
import './CurrentUser.scss';

type Props = {
  currentUser: User | null;
  clearUser(id: number): Promise<void>;
};

export const CurrentUser: React.FC<Props> = ({ currentUser, clearUser }) => {
  return currentUser && (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{currentUser.id ? `Selected user: ${currentUser.id}` : 'Could not find user'}</span></h2>

      <h3 className="CurrentUser__name">{currentUser.name ? currentUser.name : 'No information about this user'}</h3>
      <p className="CurrentUser__email">{currentUser.email}</p>
      <p className="CurrentUser__phone">{currentUser.phone}</p>
      <button
        className="CurrentUser__clear"
        type="button"
        onClick={() => clearUser(0)}
      >
        Clear
      </button>
    </div>
  );
};
