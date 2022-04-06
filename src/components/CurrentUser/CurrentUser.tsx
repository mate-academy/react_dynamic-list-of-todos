import React from 'react';
import './CurrentUser.scss';

type Props = {
  selectedUser: number,
  currentUser: User,
};

export const CurrentUser: React.FC<Props> = ({ selectedUser, currentUser }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUser}`}</span></h2>

    <h3 className="CurrentUser__name">{currentUser.name}</h3>
    <p className="CurrentUser__email">{currentUser.email}</p>
    <p className="CurrentUser__phone">{currentUser.phone}</p>
  </div>
);
