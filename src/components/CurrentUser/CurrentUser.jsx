import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../API/api';
import './CurrentUser.scss';

export class CurrentUser extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevState) {
    if (prevState.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const user = await getUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { userId, onClear } = this.props;
    const { user } = this.state;

    if (!user) {
      return (<span> Wait please </span>);
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user:  ${userId}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="button is-dark"
          onClick={() => onClear()}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};
