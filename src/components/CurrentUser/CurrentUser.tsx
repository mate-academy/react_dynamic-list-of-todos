import React from 'react';
import './CurrentUser.scss';
import { User } from '../../react-app-env';
import { getUser } from '../../api';

type Props = {
  userId: number,
  clearUser: () => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.loadUserFromServer();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserFromServer();
    }
  }

  loadUserFromServer = async () => {
    try {
      const user = await getUser(this.props.userId);

      this.setState({ user });
    } catch (error) {
      this.setState({ user: null });
    }
  };

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <>
          <p>Loading User...</p>
        </>
      );
    }

    return (
      <>
        {user && (
          <div className="CurrentUser">
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>
        )}
        <button
          className="button"
          type="button"
          onClick={this.props.clearUser}
        >
          Clear
        </button>
      </>
    );
  }
}
