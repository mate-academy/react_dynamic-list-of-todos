import React from 'react';
import PropTypes from 'prop-types';

const User = ({ userData }) => (
  <span>
    {userData.name}
  </span>
);

User.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default User;
