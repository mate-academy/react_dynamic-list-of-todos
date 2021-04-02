import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { loadUsers } from '../../api/api';
import { Loader } from '../Loader/Loader';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    const { selectedUserId } = this.props;

    if (prevProps.selectedUserId !== selectedUserId) {
      this.getUser();
    }
  }

  async getUser() {
    const { selectedUserId } = this.props;

    const userA = await loadUsers(selectedUserId);

    this.setState({ user: userA });
  }

  render() {
    const { user } = this.state;

    if (user === null) {
      return (
        <Loader />
      );
    }

    return (
      <div className="CurrentUser">
        <div>
          <h2 className="CurrentUser__title">
            <span>
              {user.id}
            </span>
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
      </div>
    );
  }
}

CurrentUser.propTypes = {
  clearUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
};
