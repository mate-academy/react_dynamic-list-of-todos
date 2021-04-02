import React from 'react';
import PropTypes from 'prop-types';
import { getId } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.getUserInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUserInfo();
    }
  }

  async getUserInfo() {
    const user = await getId(this.props.userId);

    this.setState({ user: user.data });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        {!user ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {' '}
                {user.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              type="button"
              onClick={() => clearUser()}
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
  clearUser: PropTypes.func.isRequired,
};
