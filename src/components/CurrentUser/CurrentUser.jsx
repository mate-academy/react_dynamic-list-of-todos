import React from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
    error: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.getUser();
    }
  }

  getUser() {
    getUserById(this.props.userId)
      .then((response) => {
        if (response.data === null) {
          throw new Error(`No user with id ${this.props.userId}`);
        }

        this.setState({
          user: response.data,
          error: false,
        });
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });
  }

  render() {
    if (this.state.error) {
      return (
        <p>{this.state.error.message}</p>
      );
    }

    if (this.state.user === null) {
      this.getUser();
    }

    return (
      <>
        { this.state.user
          ? (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title">
                <span>
                  Selected user:
                  {this.state.user.id}
                </span>
              </h2>

              <h3 className="CurrentUser__name">
                {this.state.user.name}
              </h3>
              <p className="CurrentUser__email">
                {this.state.user.email}
              </p>
              <p className="CurrentUser__phone">
                {this.state.user.phone}
              </p>
            </div>
          )
          : (
            <button
              type="button"
              className="button is-primary is-loading"
              title="User is loading"
            />
          )}
      </>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
};
