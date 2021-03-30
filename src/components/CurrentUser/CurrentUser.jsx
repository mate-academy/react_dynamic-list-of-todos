import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export const CurrentUser = ({ selectedUser, clearSelect }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        Selected user:
        #
        {selectedUser.id}
      </span>
    </h2>

    <h3 className="CurrentUser__name">{selectedUser.name}</h3>
    <p className="CurrentUser__email">{selectedUser.email}</p>
    <p className="CurrentUser__phone">{selectedUser.phone}</p>
    <button
      className="
        TodoList__user-button
        TodoList__user-button--selected
        button"
      type="button"
      onClick={clearSelect}
    >
      Unselect user
    </button>
  </div>
);

CurrentUser.propTypes = {
  selectedUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  clearSelect: PropTypes.func.isRequired,
};
