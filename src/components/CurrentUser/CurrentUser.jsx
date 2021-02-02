import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    const { userId } = this.props;

    const user = await this.fetchUser(userId);

    this.setState({ user });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    const user = await this.fetchUser(this.props.userId);

    this.setState({ user });
  }

  async fetchUser(userId) {
    const user = await getUser(userId);

    return user;
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <p>User's info is loading...</p>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${user.id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          className="CurrentUser__clear"
          onClick={this.props.clearUser}
        >
          Clear user
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
