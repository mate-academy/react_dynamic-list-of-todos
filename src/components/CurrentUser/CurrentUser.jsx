import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { loadUsers } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

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
    if (!this.state.user) {
      return <div />;
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${this.state.user.id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{this.state.user.name}</h3>
        <p className="CurrentUser__email">{this.state.user.email}</p>
        <p className="CurrentUser__phone">{this.state.user.phone}</p>

        <button
          type="button"
          onClick={this.props.clearUser}
          className="CurrentUser__clear button"
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
