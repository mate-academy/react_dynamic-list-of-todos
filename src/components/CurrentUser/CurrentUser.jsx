import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export class CurrentUser extends Component {
  state = {
    user: null,
  }

  async componentDidMount() {
    getUser(this.props.userId).then((user) => {
      this.setState({ user });
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      getUser(this.props.userId).then((user) => {
        this.setState({ user });
      });
    }
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <div className="loader">
          <Loader
            type="Oval"
            color="#499EAC"
            height={50}
            width={50}
            timeout={4000}
          />
          <div hidden />
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          onClick={this.props.clearUser}
          className="button"
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
