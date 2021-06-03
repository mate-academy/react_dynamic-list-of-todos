import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { request } from '../../api/todos';

export class CurrentUser extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    request('/users', `/${this.props.userId}`)
      .then((user) => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      request('/users', `/${this.props.userId}`)
        .then((user) => {
          this.setState({ user });
        });
    }
  }

  render() {
    const { onClear } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        {user ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                {`Selected user: ${user.id}`}
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
              className="button"
              type="button"
              onClick={() => onClear()}
            >
              Clear select user
            </button>
          </>
        ) : (
          <>
            Loading...
          </>
        )}
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onClear: PropTypes.func.isRequired,
};
