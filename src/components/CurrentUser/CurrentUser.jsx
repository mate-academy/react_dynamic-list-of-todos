import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
    errorMessage: '',
  }

  componentDidMount() {
    const { userId } = this.props;

    if (userId > 0) {
      this.getUser(userId);
    }
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    this.getUser(userId);
  }

  getUser = async(id) => {
    try {
      const currentUser = await getUser(id);

      this.setState({ user: currentUser });
    } catch (error) {
      this.setState({ errorMessage: error });
    }
  }

  render() {
    const { user, errorMessage } = this.state;
    const { userId, clearUser } = this.props;

    if (!user) {
      return null;
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          {!errorMessage ? user && (
            <span>
              Selected user:
              {userId}
            </span>
          ) : (
            <p className="error">{errorMessage}</p>
          )}
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="button CurrentUser__clear"
          onClick={() => clearUser()}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number,
  clearUser: PropTypes.func.isRequired,
};

CurrentUser.defaultProps = {
  userId: 0,
};
