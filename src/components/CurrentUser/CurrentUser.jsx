import React from 'react';
import propTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import './CurrentUser.scss';
import { getUsers } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId === this.state.user.id) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getUsers(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { clearSelectedUser } = this.props;

    if (user.id === undefined) {
      return (
        <div className="loader">
          <Loader
            type="Circles"
            color="purple"
            height={120}
            width={120}
            timeout={3000}
          />
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear button"
          onClick={clearSelectedUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: propTypes.number.isRequired,
  clearSelectedUser: propTypes.func.isRequired,
};
