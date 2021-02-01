import React from 'react';
import PropTypes from 'prop-types';
import { getUserId } from '../../data/api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: null,
    loading: false,
    error: false,
  }

  componentDidMount() {
    const { userId } = this.props;

    this.setState({ loading: true });
    getUserId(userId).then((response) => {
      this.setState({
        user: response.data,
        loading: false,
      });
    }).catch(() => this.setState({
      loading: false,
      error: true,
    }));
  }

  componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId !== userId) {
      this.setState({
        loading: true,
        error: false,
      });

      getUserId(userId).then((response) => {
        this.setState({
          user: response.data,
          loading: false,
        });
      }).catch(() => this.setState({
        loading: false,
        error: true,
      }));
    }
  }

  render() {
    const { user, loading, error } = this.state;
    const { userId, clearUser } = this.props;

    if (loading) {
      return <p>Waiting</p>;
    }

    if (error) {
      return <p>Something went wrong</p>;
    }

    if (user) {
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
            className="button TodoList__user-button--selected"
            onClick={clearUser}
          >
            Clear
          </button>
        </div>
      );
    }

    return <p>No user info</p>;
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
