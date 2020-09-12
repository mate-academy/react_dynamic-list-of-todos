import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../api/api';

export class CurrentUser extends React.Component {
  state = {
    currentId: 0,
    user: {},
  };

  componentDidMount() {
    getUser(this.props.userId)
      .then((users) => {
        this.setState({
          currentId: this.props.userId,
          user: users.data,
        });
      });
  }

  componentDidUpdate() {
    if (this.props.userId === this.state.currentId) {
      return;
    }

    getUser(this.props.userId)
      .then((users) => {
        this.setState({
          currentId: this.props.userId,
          user: users.data,
        });
      });
  }

  render() {
    const { user } = this.state;
    const { userId, clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__heading">
          {`Selected user: ${userId}`}
        </h2>

        <ul className="CurrentUser__list">
          <li className="CurrentUser__name">
            {user.name}
          </li>
          <li className="CurrentUser__email">
            {user.email}
          </li>
          <li className="CurrentUser__phone">
            {user.phone}
          </li>
          <li className="CurrentUser__website">
            {user.website}
          </li>
          <li className="CurrentUser__createdAt">
            {user.createdAt}
          </li>
        </ul>
        <button
          type="button"
          className="CurrentUser__clear-user"
          onClick={() => clearUser()}
        >
          Clear user
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
