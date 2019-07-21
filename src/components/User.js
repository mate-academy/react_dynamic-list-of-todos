import React from 'react';
import PropTypes from 'prop-types';

const User = ({ item }) => (
  <div>
    {item.name}
  </div>
);

User.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
};

export default User;
