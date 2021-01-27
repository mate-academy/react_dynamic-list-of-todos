import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

import { getUser } from '../api';

export class CurrentUser extends React.Component {
  state = {
    selectedUser: 0,
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    this.loadUser();
  }

  loadUser = async() => {
    await getUser(this.props.userId)
      .then(selectedUser => this.setState({ selectedUser: selectedUser.data }));
  }

  render() {
    const { selectedUser } = this.state;
    const { id, name, email, phone } = selectedUser;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          className="CurrentUser__clear"
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
