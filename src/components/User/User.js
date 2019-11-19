import React from 'react';
import PropTypes from 'prop-types';

function User(props) {
  const { user } = props;

  return (
    <a className="user-info" href={`mailto:${user.email}`}>{user.name}</a>
  );
}

User.defaultProps = {
  user: {},
};

User.propTypes = {
  user: PropTypes.objectOf,
};

export default User;
