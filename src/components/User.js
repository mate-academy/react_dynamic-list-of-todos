import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <td>
    <a href={`mailto:${user.id}`} />
    {user.name}
  </td>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

export default User;
