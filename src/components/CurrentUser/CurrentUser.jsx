import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUserDetails } from '../../api/api';
import { Button } from '../Button';

export class CurrentUser extends Component {
  state = {
    currentUser: null,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUserDetails();
    }
  }

  async getUserDetails() {
    const { userId } = this.props;
    const currentUser = await getUserDetails(userId);

    this.setState({ currentUser: { ...currentUser } });
  }

  render() {
    const { currentUser } = this.state;
    const { onUserClear, userId } = this.props;

    if (currentUser === null) {
      this.getUserDetails();
    }

    return currentUser && (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {currentUser.id ? (
              `Selected user: ${currentUser.id}`) : (
              `No user with such id: ${userId}`
            )}
          </span>
        </h2>

        <h3 className="CurrentUser__name">
          {currentUser.name}
        </h3>
        <p className="CurrentUser__email">
          {currentUser.email}
        </p>
        <p className="CurrentUser__phone">
          {currentUser.phone}
        </p>
        <Button innerText="Clear" action={onUserClear} />
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onUserClear: PropTypes.func.isRequired,
};
