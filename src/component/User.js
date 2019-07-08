import React from 'react';
import PropTypes from 'prop-types';

const User = props => (
  <div>
    <p>
      {props.user.name}
    </p>
    <p>
      contact :
      {props.user.email}
    </p>
  </div>
);

User.propTypes = {
  user: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    })
  ).isRequired,
};

export default User;
