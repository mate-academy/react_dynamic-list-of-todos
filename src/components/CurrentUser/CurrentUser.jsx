import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';
import { getUser } from '../../api';

export class CurrentUser extends Component {
  state = {
    user: '',
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  loadUser() {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;

    if (user) {
      return (
        <>
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user.id}`}</span>
            </h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              type="button"
              className="my-button"
              onClick={() => this.props.clear()}
            >
              Clear
            </button>
          </div>
        </>
      );
    }

    return 'User go home';
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
};
