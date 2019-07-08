import React from 'react';
import PropTypes from 'prop-types';

const text = {
  textAlign: 'left',
  fontSize: '16px',
}

function User({ users }) {
  return (
    <div className="container">
      <p style={text}>
        {users.username}
      </p>
      <p style={text}>
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
