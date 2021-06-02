import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { getUser } from '../../scripts/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  componentDidMount() {
    this.loadNewUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadNewUser();
    }
  }

  loadNewUser = () => {
    getUser(this.props.userId)
      .then((user) => {
        this.setState({ user });
      });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        {user ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                {`Selected user: ${user.id}`}
              </span>
            </h2>

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
              className="CurrentUser__clear button"
              type="button"
              onClick={() => {
                clearUser();
              }}
            >
              Clear selected user
            </button>
          </>
        ) : (
          <>
            Loading...
          </>
        )}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
