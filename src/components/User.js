import React from 'react';
import PropTypes from 'prop-types';

function User({ users }) {
  return (
    <div>
      <p className="text">
        {users.username}
      </p>
      <p className="text">
        {users.email}
      </p>
    </div>
  );
}
User.propTypes = {
  users: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
export default User;
