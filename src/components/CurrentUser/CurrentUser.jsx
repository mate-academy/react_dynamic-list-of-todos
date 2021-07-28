import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';

import { getUser } from '../../api/api';

export class CurrentUser extends Component {
  state = {
    user: 0,
  };

  async componentDidMount() {
    const { userId } = this.props;
    const user = await getUser(userId);

    this.setState({ user });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    getUser(this.props.userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <img
          style={{
            maxWidth: '40px',
            margin: '0 auto',
            display: 'block',
          }}
          alt="Loading"
          src="https://acegif.com/wp-content/uploads/loading-96.gif"
        />
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
          className="CurrentUser__clear"
          type="button"
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
