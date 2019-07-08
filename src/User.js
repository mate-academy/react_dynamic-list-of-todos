import React from 'react';
import PropTypes from 'prop-types';

import './Styles/User.css';

const User = ({ userData }) => (
  <tr className="user">
    <td className="user_user-name">{userData.name}</td>
    <td className="user_user-nickname">
      (
      {userData.username}
      )
    </td>
  </tr>
);

User.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

export default User;
