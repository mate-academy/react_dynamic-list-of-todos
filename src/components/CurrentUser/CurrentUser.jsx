import React from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';

import { getUser } from '../../api/api';


export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  loadUser() {
    getUser(this.props.userId)
      .then(data => this.setState({
        user: data.data,
      }));
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {this.props.userId}
          </span>
        </h2>

        {!user ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              onClick={() => this.props.onSelectedUser(0)}
              className="CurrentUser__button"
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onSelectedUser: PropTypes.func.isRequired,
};
