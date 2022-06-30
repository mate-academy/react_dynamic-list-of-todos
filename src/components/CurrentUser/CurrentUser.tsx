import React from 'react';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

interface CurrentUserProps {
  user: User
}

export const CurrentUser: React.FC<CurrentUserProps> = ({ user }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

    <h3 className="CurrentUser__name">{user.name}</h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>
  </div>
);
