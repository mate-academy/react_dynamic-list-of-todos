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
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
