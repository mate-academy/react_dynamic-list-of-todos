import React from 'react';
import PropTypes from 'prop-types';

function User({ user }) {
  const { name } = user;

  return (
    <>
      <td>{name}</td>
    </>
  );
}

export default User;

User.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
};
