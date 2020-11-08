import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

export class CurrentUser extends React.Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const { userId } = this.props;

    this.changeUser(userId);
  }

  componentDidUpdate() {
    const { userId } = this.props;

    if (this.state.user.id === userId) {
      return;
    }

    this.changeUser(userId);
  }

  changeUser(userId) {
    getUser(userId)
      .then((user) => {
        this.setState({
          user,
        });
      });
  }

  render() {
    const { user: { name, id, email, phone } } = this.state;
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
          className="CurrentUser__clear button"
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
