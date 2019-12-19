import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  return (
    <td className="table__item">{user.name}</td>
  );
}

User.propTypes = { user: PropTypes.oneOfType([PropTypes.object]).isRequired };

export default User;
