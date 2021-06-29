import React from 'react';

import './CurrentUser.scss';

import PropTypes from 'prop-types';
import { getUser } from '../../api/users';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId === prevProps.userId) {
      return;
    }

    this.loadUser();
  }

  loadUser() {
    getUser(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  render() {
    const { user } = this.state;
    const { userClear, userId } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${userId}`}</span>
        </h2>

        {!user ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </>
        )}

        <button
          onClick={userClear}
          type="button"
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userClear: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
