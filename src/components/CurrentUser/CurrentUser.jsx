import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { request } from '../../api';

export class CurrentUser extends Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    this.loadUser();
  }

  loadUser() {
    request(`/users/${this.props.userId}`)
      .then((user) => {
        this.setState({
          user,
        });
      });
  }

  render() {
    const { userId, onClick } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {userId}
          </span>
        </h2>
        {!user ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              type="button"
              className="button"
              onClick={onClick}
            >
              Clear
            </button>
          </>
        )}

      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
