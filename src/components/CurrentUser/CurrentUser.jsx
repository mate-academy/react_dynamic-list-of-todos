import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../api';

export class CurrentUser extends React.Component {
  state = {
    user: '',
  }

  componentDidMount() {
    const { userId } = this.props;

    getUser(userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate() {
    const { userId } = this.props;

    if (this.state.user.id === userId) {
      return;
    }

    getUser(userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { userId, clearUser } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2>{`Selected user: ${userId}`}</h2>

        <ul>
          <li>{user.name}</li>
          <li>{user.email}</li>
          <li>{user.phone}</li>
        </ul>
        <button
          type="button"
          onClick={() => clearUser()}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
