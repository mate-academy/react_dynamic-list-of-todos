import React from 'react';
import PropTypes from 'prop-types';

import { getUser } from '../../api/api';

import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.updateUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.updateUser();
    }
  }

  updateUser = () => {
    const { userId } = this.props;

    getUser(userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <div className="CurrentUser__loading">
          <i className="fas fa-spinner fa-spin CurrentUser__spin" />
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Select user
            {' '}
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {user.name}
        </h3>
        <p className="CurrentUser__email">
          {user.email}
        </p>
        <p className="CurrentUser__phone">
          {user.phone}
        </p>
        <div className="CurrentUser__btn-wrap">
          <button
            className="fas fa-recycle CurrentUser__btn"
            onClick={this.props.clearUser}
            type="button"
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
