import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api/users';

export class CurrentUser extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.loadData();
    }
  }

  async loadData() {
    const selectedUser = await getUser(this.props.userId);

    this.setState({ user: selectedUser.data });
  }

  render() {
    const { clearUser } = this.props;
    const { id, name, email, phone } = this.state.user;

    return (
      <div className="CurrentUser">
        <button
          className="ui primary button"
          type="button"
          onClick={clearUser}
        >
          Clear
        </button>

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
      </div>
    );
  }
}

CurrentUser.propTypes = {
  clearUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
}.isRequired;
