import React from 'react';
import propTypes from 'prop-types';
import './CurrentUser.scss';
import { getUserInfo } from '../../API/api';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    this.getUser();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUser();
    }
  }

  getUser = async() => {
    const user = await getUserInfo(this.props.userId);

    this.setState({
      user,
    });
  }

  render() {
    const { clearSelectedUser } = this.props;
    const { user } = this.state;

    return user ? (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.id}
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
          type="button"
          className="button__clear"
          onClick={clearSelectedUser}
        >
          Clear
        </button>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

CurrentUser.propTypes = {
  clearSelectedUser: propTypes.func.isRequired,
  userId: propTypes.number.isRequired,
};
