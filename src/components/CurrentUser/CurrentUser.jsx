import React from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    currentId: 0,
    user: {},
  }

  loadUser = async() => {
    const user = await getUser(this.props.userId);

    if (!user.data) {
      this.props.clearUser();
    }

    this.setState({
      user: user.data,
      currentId: this.props.userId,
    });
  }

  componentDidMount = () => {
    this.loadUser();
  }

  componentDidUpdate = async() => {
    if (this.props.userId === this.state.currentId) {
      return;
    }

    this.loadUser();
  }

  render() {
    const { user } = this.state;
    const { userId, clearUser } = this.props;

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
