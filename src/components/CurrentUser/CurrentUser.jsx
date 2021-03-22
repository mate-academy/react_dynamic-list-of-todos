import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../services/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    const user = await getUser(`/${this.props.userId}`);

    this.setState(({ user }));
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      const user = await getUser(`/${this.props.userId}`);

      this.setState(({ user }));
    }
  }

  render() {
    const { clearUsers } = this.props;
    const { user } = this.state;

    return (
      user
      && (
      <div className="CurrentUser">
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
          className="userDelete-btn"
          onClick={clearUsers}
        >
          Clear
        </button>
      </div>
      )
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUsers: PropTypes.func.isRequired,
};
