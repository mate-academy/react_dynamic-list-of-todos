import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const user = await getUser(this.props.selectedUserId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return 'Wait please';
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          onClick={this.props.clearUser}
          className="button"
        >
          Clear User
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
