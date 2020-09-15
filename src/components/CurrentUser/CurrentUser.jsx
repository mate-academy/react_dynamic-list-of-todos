import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    currentUser: {},
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate() {
    const { currentUser } = this.state;

    if (currentUser.id === this.props.userId) {
      return;
    }

    this.loadUser();
  }

  loadUser = async() => {
    const user = await getUser(this.props.userId);

    if (!user) {
      return;
    }

    this.setState(state => ({ currentUser: user }));
  };

  render() {
    const { currentUser } = this.state;
    const { userId, clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${userId}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{currentUser.name}</h3>
        <p className="CurrentUser__email">{currentUser.email}</p>
        <p className="CurrentUser__phone">{currentUser.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={() => clearUser()}
        >
          Clear user
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
