import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

function User({ user }) {
  return (
    <div className="user">
      <p className="user__responsible">
        responsible:
        <span className="user_indent">
          {user.name}
        </span>
      </p>
      <p className="user__email">
        contact:
        <span className="user_indent">
          {user.email}
        </span>
      </p>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default User;
