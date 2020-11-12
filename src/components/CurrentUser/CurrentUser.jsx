/* eslint-disable no-console */
/* eslint-disable arrow-parens */
import React from 'react';
import './CurrentUser.scss';

import PropTypes from 'prop-types';
import { request } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
    error: false,
  };

  componentDidMount() {
    const { userId } = this.props;

    this.getUser(userId);
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId !== this.props.userId) {
      this.updateuser(userId);
    }
  }

  getUser(userId) {
    request(`users/${userId}`).then((res) => {
      if (res.data) {
        this.setState({
          user: res.data,
          error: false,
        });
      } else {
        this.setState({
          user: {},
          error: true,
        });
      }
    });
  }

  updateuser(userId) {
    this.setState({ user: null });
    this.getUser(userId);
  }

  renderUser(user) {
    const { setSelectedUserId, setPressedUserBtn } = this.props;
    const { error } = this.state;

    return error ? (
      'Such user does not exist'
    ) : (
      <>
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {this.props.userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="clear-btn"
          onClick={() => {
            setSelectedUserId(0);
            setPressedUserBtn(0);
          }}
        >
          Clear
        </button>
      </>
    );
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        {user ? (
          this.renderUser(user)
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number,
  setSelectedUserId: PropTypes.func.isRequired,
  setPressedUserBtn: PropTypes.func.isRequired,
};

CurrentUser.defaultProps = {
  userId: 0,
};
