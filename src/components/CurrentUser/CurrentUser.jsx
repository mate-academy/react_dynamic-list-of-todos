import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';

import { getUser } from '../../api';

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
    const { userId } = this.props;
    const user = await getUser(userId);

    if (!user) {
      return;
    }

    this.setState(state => ({
      currentUser: user.data,
    }));
  }

  render() {
    const { currentUser } = this.state;
    const { userId, clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {userId}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{currentUser.name}</h3>
        <p className="CurrentUser__email">{currentUser.email}</p>
        <p className="CurrentUser__phone">{currentUser.phone}</p>
        <button
          type="button"
          onClick={() => clearUser()}
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
