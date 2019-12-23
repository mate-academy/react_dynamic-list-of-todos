import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name }) => (
  <>
    <td>{name}</td>
  </>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};

export default User;
