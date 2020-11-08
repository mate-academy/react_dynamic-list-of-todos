import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api';
import './SelectedUser.scss';

export class SelectedUser extends React.PureComponent {
  state = {
    user: {},
    userError: false,
  }

  componentDidMount() {
    const { userId } = this.props;

    this.updateUser(userId);
  }

  componentDidUpdate() {
    const { userId } = this.props;

    this.updateUser(userId);
  }

  async updateUser(newUserId) {
    if (this.state.user.id === newUserId) {
      return;
    }

    const newUser = await getUser(newUserId);

    if (!newUser) {
      this.setState({ userError: true });

      return;
    }

    this.setState({ userError: false });

    this.setState({ user: newUser });
  }

  render() {
    const { user, userError } = this.state;
    const { clearSelectedUser } = this.props;

    return (
      <>
        {userError
          ? (<h3>{`Can't find user info `}</h3>)
          : (
            <div className="SelectedUser">
              <button
                type="button"
                className="button"
                onClick={clearSelectedUser}
              >
                Clear
              </button>

              <h2 className="SelectedUser__title">
                {`User: #${user.id}`}
              </h2>

              <h3 className="SelectedUser__name">
                {user.name}
              </h3>

              <p className="SelectedUser__email">
                {user.email}
              </p>

              <p className="SelectedUser__phone">
                {user.phone}
              </p>
            </div>
          )}
      </>
    );
  }
}
SelectedUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearSelectedUser: PropTypes.func.isRequired,
};
