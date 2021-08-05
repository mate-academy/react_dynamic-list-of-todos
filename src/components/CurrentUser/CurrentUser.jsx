import React from 'react';
import PropTypes from 'prop-types';
import { request } from '../../utils/request';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadCurrentUser();
    }
  }

  loadCurrentUser() {
    request(`/users/${this.props.userId}`).then((user) => {
      this.setState({
        user,
      });
    });
  }

  render() {
    const { user } = this.state;
    const { resetUser } = this.props;

    if (!user) {
      return (
        <>
          <div className="spinner-border" role="status">
            <span className="sr-only" />
          </div>
          <p>User details are loading...</p>
        </>
      );
    }

    return (
      <div className="CurrentUser">
        {user && (
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user:
            ${user.id}`}
          </span>
        </h2>
        )}

        {user && (
        <div>
          <h3 className="CurrentUser__name">
            {user.name}
          </h3>
          <p className="CurrentUser__email">
            {user.email}
          </p>
          <p className="CurrentUser__phone">
            {user.phone}
          </p>
          <button
            type="button"
            className="button CurrentUser__clear"
            onClick={resetUser}
          >
            Clear
          </button>
        </div>
        )}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  resetUser: PropTypes.func.isRequired,
};
