import React from 'react';
import PropTypes from 'prop-types';

const User = ({ todo }) => (
  <td>{todo.user.name}</td>
);

User.propTypes = {
  todo: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default User;
