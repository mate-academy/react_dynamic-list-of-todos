import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { loadUsers } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.setUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setUser();
    }
  }

  async setUser() {
    const user = await loadUsers(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <div />;
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
