import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const { userId } = this.props;

    fetchUser(userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate() {
    const { userId } = this.props;

    if (this.state.user.userId === userId) {
      return;
    }

    fetchUser(userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          {`Selected user: ${this.props.userId}`}
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
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
