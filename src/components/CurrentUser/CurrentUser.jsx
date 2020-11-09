import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { httpRequest } from '../api';

class CurrentUser extends React.PureComponent {
  state = {
    user: {},
  }

  componentDidMount() {
    httpRequest(`users/${this.props.userId}`)
      .then(users => this.setState({
        user: users.data,
      }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      httpRequest(`users/${this.props.userId}`)
        .then(users => this.setState({
          user: users.data,
        }));
    }
  }

  render() {
    const { name, email, phone, id } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          className="fluid negative ui button"
          onClick={this.props.clearUser}
          type="button"
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

export default CurrentUser;
