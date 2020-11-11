import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api';
import './CurrentUser.scss';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  async componentDidMount() {
    const { userId } = this.props;
    const selectedUser = await getUser(userId);

    this.updateUser(selectedUser);
  }

  async componentDidUpdate(prevProps) {
    const { userId } = this.props;

    if (prevProps.userId !== userId) {
      const selectedUser = await getUser(userId);

      this.updateUser(selectedUser);
    }
  }

  updateUser = (user) => {
    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    const { phone, id, name, email } = user;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <button
          type="button"
          onClick={clearUser}
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
  clearUser: PropTypes.func.isRequired,
};
