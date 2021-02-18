import React from 'react';
import PropTypes from 'prop-types';
import { request } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = { currentUser: {} }

  componentDidMount() {
    this.setCurrentUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setCurrentUser();
    }
  }

  async setCurrentUser() {
    const allUsers = await request('users/', this.props.userId);
    const currentUser = allUsers.find(user => user.id === this.props.userId);

    this.setState({ currentUser });
  }

  render() {
    const { id, name, email, phone } = this.state.currentUser;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          className="TodoList__user-button button buttonLocation"
          onClick={() => {
            this.props.clearUserInfo();
          }}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUserInfo: PropTypes.func.isRequired,
};
