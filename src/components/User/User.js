import React from 'react';
import './User.css';
import PropTypes from 'prop-types';

const User = ({ user, setUserInfo }) => (
  <div className="user">
    <div className="user__info">
      <h3 className="user__name">{user.name}</h3>
      <div className="additional-info">
        <p className="user__username">{user.username}</p>
        <p className="user__email">{user.email}</p>
        <a href={user.website} className="user__website">{user.website}</a>
      </div>
    </div>
    {/* eslint-disable-next-line max-len */}
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
    <div onClick={() => { setUserInfo(); }} className="user__background"> </div>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
  setUserInfo: PropTypes.func.isRequired,

};

export default User;
