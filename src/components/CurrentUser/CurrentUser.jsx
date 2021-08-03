import React from 'react';
import { userPropTyes } from '../../utils';
import './CurrentUser.scss';

export const CurrentUser = ({ user }) => {
  const { id, name, email, phone } = user;

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${id}`}</span>
      </h2>
      <h3 className="CurrentUser__name">{name}</h3>
      <p className="CurrentUser__email">{email}</p>
      <p className="CurrentUser__phone">{phone}</p>
    </div>
  );
};

CurrentUser.propTypes = userPropTyes;
