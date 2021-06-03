import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api';

import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.setUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setUser();
    }
  }

  async setUser() {
    const user = await getUser(this.props.userId);

    this.setState({ user: user.data });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <p>Loading...</p>;
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          className="button"
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
