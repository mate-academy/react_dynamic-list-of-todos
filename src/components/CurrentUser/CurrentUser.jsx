import React from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';

import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    this.loadUser();
  }

  loadUser = () => {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { userId, clearUser } = this.props;
    const { user } = this.state;

    return (
      user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${userId}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            type="button"
            onClick={clearUser}
          >
            Clear
          </button>
        </div>
      ) : (
        <p>No such user</p>
      )
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
