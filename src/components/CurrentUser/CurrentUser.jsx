import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUsers } from '../../api/api';

export class CurrentUser extends Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    this.loadData();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.userId === prevProps.userId) {
      return;
    }

    this.loadData();
  }

  async loadData() {
    const user = await getUsers(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { userId, clear } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user:
            ${userId}`}
          </span>
        </h2>

        {user && (
          <>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </>
        )}

        <button
          type="button"
          className="CurrentUser__clear"
          onClick={clear}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
};
