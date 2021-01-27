import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUsers } from '../../app/loadTodos';

export class CurrentUser extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    getUsers()
      .then((usersFromServer) => {
        this.setState({
          users: usersFromServer,
        });
      });
  }

  render() {
    const { users } = this.state;
    const { userId } = this.props;
    const user = users.find(userFind => userFind.id === userId);

    return (
      <>
        {users.length > 0 ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {user.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>
        ) : 'Loading...'}
      </>

    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
};
