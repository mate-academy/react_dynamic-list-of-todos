import React from 'react';
import { User } from '../types/User';
import './CurrentUser.scss';

type Props = {
  user: User | null;
  clearId: React.Dispatch<React.SetStateAction<number>>;
};

export const CurrentUser: React.FC<Props> = ({ user, clearId }) => (
  <div className="">
    {user && (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>
        <h3 className="CurrentUser__name" data-cy="userName">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="CurrentUser__btn"
          onClick={() => clearId(0)}
        >
          Clear
        </button>
      </div>
    )}
  </div>
);
