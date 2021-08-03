import React from 'react';
import PropTypes from 'prop-types';

import { getUser } from '../../api/api';

import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    getUser(this.props.userId)
      .then((user) => {
        this.setState({
          user,
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.props.userId) {
      return;
    }

    getUser(this.props.userId)
      .then((user) => {
        this.setState({
          user,
        });
      });
  }

  render() {
    const { user } = this.state;
    const { userId, clearUser } = this.props;

    return (

      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {userId}
            </span>
          </h2>

          {user && (
          <>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">Shanna@melissa.tv</p>
            <p className="CurrentUser__phone">010-692-6593 x09125</p>
          </>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            clearUser(user.id);
          }}
          className="btn btn-outline-secondary"
        >
          Clear
        </button>
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
