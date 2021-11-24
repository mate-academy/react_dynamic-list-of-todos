import React from 'react';
import './CurrentUser.scss';
import { User } from '../../react-app-env';

interface Props {
  user: User,
}

export const CurrentUser: React.FC<Props> = ({ user }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

    <h3 className="CurrentUser__name">{user.name}</h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>
  </div>
);
