import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsers } from '../../api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    getUsers()
      .then(users => this.setState({
        user: users.find(usr => usr.id === this.props.userId),
      }));
  }

  componentDidUpdate() {
    if (this.props.userId !== this.state.user.id) {
      getUsers()
        .then(users => this.setState({
          user: users.find(usr => usr.id === this.props.userId),
        }));
    }
  }

  render() {
    const { id, name, email, phone } = this.state.user;
    const { clearSelectedUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user: #
            {id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>
        <button
          type="button"
          onClick={clearSelectedUser}
        >
          Clear
        </button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
};
