import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export const CurrentUser = ({ users, selectedUserId }) => {
  const selectedUser = users.find(user => selectedUserId === user.id);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:&nbsp;
          {selectedUserId}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{selectedUser.name}</h3>
      <p className="CurrentUser__email">{selectedUser.email}</p>
      <p className="CurrentUser__phone">{selectedUser.phone}</p>
    </div>
  );
};

CurrentUser.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
