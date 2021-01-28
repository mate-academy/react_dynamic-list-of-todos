import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import { getUserById } from '../../helpers';

export class CurrentUser extends React.Component {
  state={
    user: {},
  }

  static propTypes = {
    userId: PropTypes.number.isRequired,
    clearSelectedUser: PropTypes.func.isRequired,
  }

  async componentDidMount() {
    const response = await getUserById(this.props.userId);

    this.setState({ user: response.data });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      const response = await getUserById(this.props.userId);
      // eslint-disable-next-line
      this.setState({ user: response.data });
    }
  }

  render() {
    const { userId, clearSelectedUser } = this.props;
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${userId}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          className="CurrentUser__clear"
          type="button"
          onClick={clearSelectedUser}
        >
          Clear
        </button>
      </div>
    );
  }
}
