import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { getUserById } from '../../api/request';

export class CurrentUser extends React.PureComponent {
  state = {
    user: {},
    isLoading: false,
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUser();
    }
  }

  getUser() {
    this.setState({ isLoading: true });

    const selectedUserId = this.props.userId;

    getUserById(selectedUserId)
      .then(user => this.setState({ user }))
      .then(() => this.setState({ isLoading: false }));
  }

  render() {
    const { user, isLoading } = this.state;

    if (isLoading) {
      return (
        <div className="loading">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </div>
      );
    }

    const { onClick } = this.props;

    return (
      <div className="CurrentUser">
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
          type="button"
          className="CurrentUser__clear button"
          onClick={onClick}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  onClick: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
