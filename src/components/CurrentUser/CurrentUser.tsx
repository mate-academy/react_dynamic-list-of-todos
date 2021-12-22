import React from 'react';
import './CurrentUser.scss';

import { getUsers } from '../../api/api';

type Props = {
  currentUserId: number,
  clearSelectedUser: () => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    if (this.props.currentUserId !== 0) {
      this.loadUser();
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.currentUserId !== this.props.currentUserId) {
      this.loadUser();
    }
  }

  loadUser = async () => {
    try {
      const user = await getUsers(this.props.currentUserId);

      this.setState({ user });
    } catch (error) {
      this.setState({ user: null });
    }
  };

  render() {
    const { user } = this.state;
    const { currentUserId, clearSelectedUser } = this.props;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {currentUserId}
          </span>
        </h2>
        {user ? (
          <>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              className="CurrentUser__button button"
              type="button"
              onClick={clearSelectedUser}
            >
              Clear
            </button>
          </>
        ) : (
          <p>
            Cannot find this user
          </p>
        )}
      </div>
    );
  }
}
