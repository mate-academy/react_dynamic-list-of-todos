import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <tr>{user.name}</tr>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default User;
