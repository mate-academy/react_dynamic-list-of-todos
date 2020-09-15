import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../helpers/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUser(this.props.userId)
      .then(user => this.setState({ user }));
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
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>No user details</span>
          </h2>
        </div>
      );
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
          className="CurrentUser__clear button"
          type="button"
          onClick={this.props.onClear}
        >
          Clear
        </button>

      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};
