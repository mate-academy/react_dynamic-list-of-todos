import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { request } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    request(`/users/${this.props.userId}`)
      .then(({ data }) => {
        this.setState({ user: data });
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      request(`/users/${this.props.userId}`)
        .then(({ data }) => {
          this.setState({ user: data });
        });
    }
  }

  render() {
    const { user } = this.state;
    const { userClear } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          onClick={userClear}
          type="button"
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userClear: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
