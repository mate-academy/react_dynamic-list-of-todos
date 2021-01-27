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
    const selectedUser = users.find(user => user.id === userId);

    return (
      <>
        {(users.length > 0 && selectedUser) ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {selectedUser.id}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>
          </div>
        ) : '...not found'}
      </>

    );
  }
}

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
};
