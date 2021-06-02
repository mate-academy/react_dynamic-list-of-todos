import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { request } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    users: {},
  };

  componentDidMount() {
    this.getUsers();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.getUsers();
    }
  }

  getUsers = async() => {
    const userFromServer = await request(`/users/${this.props.userId}`);

    this.setState({
      users: userFromServer.data,
    });
  }

  render() {
    const { id, name, email, phone } = this.state.users;
    const { clearSelectedUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{name}</h3>
        <p className="CurrentUser__email">{email}</p>
        <p className="CurrentUser__phone">{phone}</p>

        <button
          type="button"
          className="CurrentUser__clearButton"
          onClick={() => clearSelectedUser()}
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
