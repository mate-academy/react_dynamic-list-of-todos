import React from 'react';
import PropTypes from 'prop-types';

import { getUser } from '../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidUpdate(prevProps) {
    const { selectedUserId } = this.props;

    if (prevProps.selectedUserId !== selectedUserId) {
      this.loadUser(selectedUserId);
    }
  }

  loadUser = async(selectedUserId) => {
    const { data } = await getUser(selectedUserId);

    this.setState({ user: data });
  };

  render() {
    const { id, name, email, phone } = this.state.user;
    const { clearUser } = this.props;

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
          className="button CurrentUser__clear"
          onClick={clearUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
