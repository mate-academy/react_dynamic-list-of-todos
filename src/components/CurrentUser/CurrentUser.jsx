import React from 'react';
import PropTypes from 'prop-types';

import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    const user = await getUser(this.props.userId);

    this.setState({ user: user.data });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      const user = await getUser(this.props.userId);

      // eslint-disable-next-line
      this.setState({ user: user.data });
    }
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <p>loading user</p>;
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={this.props.onClearUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClearUser: PropTypes.func.isRequired,
};
