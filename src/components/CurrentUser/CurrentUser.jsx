import React from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.setUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setUser();
    }
  }

  setUser = () => {
    getUsers(this.props.userId)
      .then((userFromServer) => {
        this.setState({
          user: userFromServer.data,
        });
      });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    if (user === null) {
      return (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user: no user information
            </span>
          </h2>
        </div>
      );
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
          className="CurrentUser__clear"
          type="button"
          onClick={clearUser}
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
