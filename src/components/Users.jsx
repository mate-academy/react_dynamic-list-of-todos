import React from 'react';
import PropTypes from 'prop-types';

const Users = ({ usersItem }) => (
  <div className="user-item">
    <div>
        Name:
      <b>
        {' '}
        {usersItem.user.name}
      </b>
    </div>
  </div>
);

Users.propTypes = {
  usersItem: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object])).isRequired,
};

export default Users;
