import React from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api';

type Props = {
  userId: number;
  clearUser: () => void;
};

interface State {
  user: User | null;
  isUserDataExist: boolean;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    isUserDataExist: true,
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserInfo();
    }
  }

  async loadUserInfo() {
    try {
      const user = await getUser(this.props.userId);

      this.setState({ user, isUserDataExist: true });
    } catch (error) {
      this.setState({ isUserDataExist: false });
    }
  }

  render() {
    const { user, isUserDataExist } = this.state;

    return (
      <div className="CurrentUser">
        {user && isUserDataExist ? (
          <>
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user?.id}`}</span>
            </h2>

            <h3 className="CurrentUser__name">{user?.name}</h3>
            <p className="CurrentUser__email">{user?.email}</p>
            <p className="CurrentUser__phone">{user?.phone}</p>
            <button
              type="button"
              className="button"
              onClick={this.props.clearUser}
            >
              Clear
            </button>
          </>
        ) : (
          <p>User is not exist</p>
        )}
      </div>
    );
  }
}
