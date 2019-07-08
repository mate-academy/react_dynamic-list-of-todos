import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <div>
      Performer:
      {` ${user.name}`}
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default User;
