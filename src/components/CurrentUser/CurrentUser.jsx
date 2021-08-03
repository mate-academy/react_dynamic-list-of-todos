import React from 'react';
import PropTypes from 'prop-types';

import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
    error: false,
  }

  componentDidMount() {
    this.getUserById(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.getUserById(this.props.userId);
    }
  }

  getUserById = (userId) => {
    getUser(userId)
      .then((userFromServer) => {
        if (userFromServer === null) {
          throw new Error(`There is no user with id: ${this.props.userId}`);
        }

        this.setState({
          user: userFromServer,
          error: false,
        });
      })
      .catch(() => this.setState({
        error: true,
      }));
  }

  render() {
    const { error } = this.state;
    const { selectUser, userId } = this.props;

    if (error) {
      return (
        <>
          <h2 className="CurrentUser__title">
            <span>{`Selected user: ${userId}`}</span>
          </h2>
          <h3 className="CurrentUser__name">
            {`There is no user with id #${userId}`}
          </h3>
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => selectUser(0)}
            >
              Clear
            </button>
          </div>
        </>
      );
    }

    const { id, name, email, phone } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <div className="btn-container">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => selectUser(0)}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
