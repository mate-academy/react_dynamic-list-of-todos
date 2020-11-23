import React from 'react';
import './CurrentUser.scss';
import { UsersIdTypes } from './UsersIdTypes';

import { getUsers } from '../../api/api';

export class CurrentUser extends React.PureComponent {
  state= {
    user: {
      id: 0,
      name: '',
      email: '',
      phone: '',
    },
  }

  componentDidMount() {
    getUsers(this.props.userId)
      .then(user => this.setState({ user }));
  }

  componentDidUpdate() {
    if (this.state.user.id !== this.props.userId) {
      getUsers(this.props.userId)
        .then(user => this.setState({ user }));
    }
  }

  render() {
    const { id, name, email, phone } = this.state.user;

    return (
      <div className="CurrentUser">
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

CurrentUser.propTypes = UsersIdTypes;
