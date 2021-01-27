import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsers } from '../../data/api';

export class CurrentUser extends React.Component {
  state = {
    users: {},
  }

  async componentDidMount() {
    this.dataLoad();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.dataLoad();
    }
  }

  async dataLoad() {
    const response = await getUsers(this.props.userId);

    this.setState({ users: response.data });
  }

  render() {
    const { users } = this.state;
    const { clearUser } = this.props;

    if (!users) {
      return (
        <p>Loading data...</p>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {users.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{users.name}</h3>
        <p className="CurrentUser__email">{users.email}</p>
        <p className="CurrentUser__phone">{users.phone}</p>
        <button type="button" onClick={() => clearUser()}>Clear user</button>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};
