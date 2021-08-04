import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    this.setUser();
  }

  setUser = () => getUser(this.props.userId)
    .then(user => this.setState({ user }));

  render() {
    const { user } = this.state;

    return user ? (
      <div
        className="CurrentUser"
        style={{ textAlign: 'center' }}
      >
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          onClick={() => this.props.onUserSelected(0)}
          style={{ fontSize: '24px' }}
        >
          Clear
        </button>
      </div>
    ) : (
      <p>One second...</p>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onUserSelected: PropTypes.func.isRequired,
};
