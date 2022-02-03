import React from 'react';
import './CurrentUser.scss';

import { getUsers } from '../../api';

type Props = {
  userId: number,
  removeUser: () => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.loadUserInfo();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserInfo();
    }
  }

  async loadUserInfo() {
    const { userId } = this.props;
    const user = await getUsers(userId);

    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    const { userId, removeUser } = this.props;

    return (
      <div>
        {user && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                Selected user:
                {userId}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              className="button"
              onClick={removeUser}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    );
  }
}
