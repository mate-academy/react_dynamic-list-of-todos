import React from 'react';
import PropTypes from 'prop-types';
import { getUsers } from '../Api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: null,
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const selectedUser = await getUsers(this.props.userId);

    this.setState({ selectedUser });
  }

  render() {
    const { selectedUser } = this.state;

    if (selectedUser === null) {
      return (
        <img
          alt="loader"
        />
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {selectedUser.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{selectedUser.name}</h3>
        <p className="CurrentUser__email">{selectedUser.email}</p>
        <p className="CurrentUser__phone">{selectedUser.phone}</p>

        <button
          type="submit"
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
