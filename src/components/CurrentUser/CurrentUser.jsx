import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export const CurrentUser = ({ users, selectedUserId, clearSelectedUser }) => {
  const selectedUser = users.find(user => selectedUserId === user.id);
  // console.log(selectedUser)

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
      <button
        className="
          TodoList__user-button
          button
        "
        type="button"
        onClick={() => clearSelectedUser()}
      >
        Clear
      </button>
    </div>
  );
};

CurrentUser.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string,
    }).isRequired,
  ).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
};
