import React from 'react';
import PropTypes from 'prop-types';

import { getUser } from '../../api/api';

import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.selectedUser();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }
    this.selectedUser();
  }

  selectedUser = () => {
    getUser(this.props.userId)
      .then(user => {
        this.setState({ user })
      })
  }

  render() {
    const { userId, clearSelectedUser } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user: {userId}
          </span>
        </h2>
        {!user ? (
          <p>
            Loading...
          </p>
        ) : (
          <>
            <h3 className="CurrentUser__name">
            {user.name}
            </h3>
            <p className="CurrentUser__email">
              {user.email}
            </p>
            <p className="CurrentUser__phone">
              {user.phone}
            </p>
            <button
              type="button"
              onClick={() => clearSelectedUser()}
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
};

CurrentUser.propTypes = {
  clearSelectedUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
