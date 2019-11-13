import React from 'react';
import PropTypes from 'prop-types';

function User(props) {
  const { name, email } = props.user;

  return (
    <td><a href={`mailto:${email}`}>{name}</a></td>
  );
}

User.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};

export default User;
