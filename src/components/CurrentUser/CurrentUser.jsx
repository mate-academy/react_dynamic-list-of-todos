import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    users: {},
  }

  async componentDidMount() {
    const { userId, allUsers } = this.props;
    const selectedUser = await allUsers(userId);

    this.updateUser(selectedUser);
  }

  async componentDidUpdate(prevProps) {
    const { userId, allUsers } = this.props;

    if (prevProps.userId === userId) {
      return;
    }

    const selectedUser = await allUsers(userId);

    this.updateUser(selectedUser);
  }

  updateUser = (id) => {
    this.setState({
      users: id,
    });
  }

  render() {
    const { users } = this.state;
    const { phone, id, name, email } = users;
    const { clear } = this.props;

    return (
      <div className="CurrentUser">
        <button
          type="button"
          onClick={clear}
          className="ui button"
        >
          Clear
        </button>
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

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  allUsers: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};
