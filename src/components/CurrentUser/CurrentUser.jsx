import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: '',
  }

  componentDidMount() {
    const { getUser, userId } = this.props;

    getUser(userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate(prevProps) {
    const { getUser, userId } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    getUser(userId)
      .then(user => this.setState({ user }));
  }

  render() {
    const { clearUser, userId } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${userId}`}
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
      </div>
    );
  }
}

CurrentUser.propTypes = {
  getUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
