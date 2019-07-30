import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <span>
      {user.name}
    </span>
  );
}

User.propTypes = {
  user: PropTypes.object,
  name: PropTypes.string,
}.isRequired;

export default User;
