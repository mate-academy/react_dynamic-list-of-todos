import React from 'react';
import PropTypes from 'prop-types';

import { getUserInfo } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUserInfo(this.props.userId)
      .then((user) => {
        this.setUser(user);
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    getUserInfo(this.props.userId)
      .then((user) => {
        this.setUser(user);
      });
  }

  setUser = (user) => {
    if (user) {
      this.setState({ user });
    } else {
      this.setState({ user: { name: 'No name provided' } });
    }
  }

  render() {
    const { userId, clearUserId } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${userId}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          className="CurrentUser__clear"
          onClick={() => clearUserId()}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUserId: PropTypes.func.isRequired,
};
