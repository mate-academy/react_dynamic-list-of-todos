import React from 'react';
import PropTypes from 'prop-types';
import './User.scss';

const User = ({
  name,
  username,
  email,
  phone,
  website,
}) => (
  <div className="user">
    <p className="user__name">{name}</p>
    <p className="user__text">{username}</p>
    <p className="user__text">{email}</p>
    <p className="user__text">{phone}</p>
    <p className="user__text">{website}</p>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
};

export default User;
