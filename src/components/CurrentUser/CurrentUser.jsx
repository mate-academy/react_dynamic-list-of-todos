import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsers } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUsers(this.props.userId).then((user) => {
      if (!user) {
        return;
      }

      this.setState({ user });
    });
  }

  componentDidUpdate() {
    if (this.state.user.id === this.props.userId) {
      return;
    }

    getUsers(this.props.userId).then((user) => {
      if (!user) {
        this.setState({
          user: {},
        });
      } else {
        this.setState({ user });
      }
    });
  }

  render() {
    const { user } = this.state;
    const { userId, clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${userId}`}</span>
        </h2>

        <div>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            type="button"
            className="CurrentUser__clear"
            onClick={clearUser}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
