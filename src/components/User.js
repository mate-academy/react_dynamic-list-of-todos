import React from 'react';
import PropTypes from 'prop-types';

const User = ({ item }) => (
  <div>
    {item.name}
  </div>
);

User.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default User;
