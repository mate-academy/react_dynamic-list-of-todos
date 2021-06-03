import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { request } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    request('/users', `/${this.props.userId}`)
      .then(({ data }) => this.setState({ user: { ...data } }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      request('/users', `/${this.props.userId}`)
        .then(({ data }) => this.setState({ user: { ...data } }));
    }
  }

  render() {
    const { id, name, email, phone } = this.state.user;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          className="CurrentUser__clear"
          type="button"
          onClick={clearUser}
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
