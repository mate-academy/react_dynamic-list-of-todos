import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export class CurrentUser extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const { userId } = this.props;

    this.setNewUser(userId);
  }

  componentDidUpdate() {
    const { userId } = this.props;

    this.setNewUser(userId);
  }

  setNewUser = (id) => {
    const { getUser, clearUser } = this.props;

    if (id === this.state.user.id) {
      return;
    }

    getUser(id).then((newUser) => {
      if (!newUser) {
        clearUser();
      } else {
        this.setState({
          user: newUser,
        });
      }
    });
  }

  render() {
    const { name, id, phone, email } = this.state.user;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={() => clearUser()}
        >
          Clear
        </button>
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number,
  getUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

CurrentUser.defaultProps = {
  userId: 0,
};
