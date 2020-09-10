import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    getUser(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  render() {
    const { user } = this.state;

    return !user
      ? 'No user selected'
      : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${user.id}`}</span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            type="button"
            onClick={() => {
              this.setState({ user: null });
            }}
          >
            Clear
          </button>
        </div>
      );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
};
