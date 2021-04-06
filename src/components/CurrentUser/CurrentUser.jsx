import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { loadUsers } from '../../api/api';
import { Loader } from '../Loader/Loader';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: null,
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

    const selectedUser = await loadUsers(selectedUserId);

    this.setState({ selectedUser });
  }

  render() {
    const { selectedUser } = this.state;

    if (selectedUser === null) {
      return (
        <Loader />
      );
    }

    return (
      <div className="CurrentUser">
        <div>
          <h2 className="CurrentUser__title">
            <span>
              {selectedUser.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{selectedUser.name}</h3>
          <p className="CurrentUser__email">{selectedUser.email}</p>
          <p className="CurrentUser__phone">{selectedUser.phone}</p>

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
