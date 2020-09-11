import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: [],
  };

  componentDidMount() {
    const { userId } = this.props;

    getUser(userId)
      .then((user) => {
        this.setState({ user: user.data });
      });
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    getUser(userId)
      .then((user) => {
        this.setState({ user: user.data });
      });
  }

  render() {
    const { userId, setSelectedUser } = this.props;
    const { name, email, phone } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            { userId }
          </span>
          <button
            className="button button-clear"
            type="button"
            onClick={() => setSelectedUser(0)}
          >
            Clear
          </button>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};
