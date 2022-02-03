import React from 'react';
import './CurrentUser.scss';

type Props = {
  selectedUser: User | null
  clearSelectedUser: () => void
};

export const CurrentUser: React.FC<Props> = ({ selectedUser, clearSelectedUser }) => (
  <>
    {selectedUser
      ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              {`Selected user: ${selectedUser.id}`}
            </span>
          </h2>
          <h3 className="CurrentUser__name">{selectedUser.name}</h3>
          <p className="CurrentUser__email">{selectedUser.email}</p>
          <p className="CurrentUser__phone">{selectedUser.phone}</p>
          <br />
        </div>
      )
      : <span>User not found</span>}

    <button
      onClick={() => clearSelectedUser()}
      type="button"
      className="button TodoList__user-button--selected clear-button"
    >
      Clear
    </button>
  </>
);
