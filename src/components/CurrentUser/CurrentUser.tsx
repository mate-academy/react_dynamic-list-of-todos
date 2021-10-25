import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

interface Props {
  userId: number,
  clearUser: () => void,
}

interface State {
  user: User | null
}

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.setUser();
    }
  }

  async setUser() {
    const { userId } = this.props;
    const user = await getUser(userId)
      .catch(() => this.setState({ user: null }));

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    if (!user) {
      return (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">User not found</h2>
          <button
            type="button"
            className="CurrentUser__button"
            onClick={clearUser}
          >
            Remove User
          </button>
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">{`Selected user: ${(user as User).id}`}</h2>

        <h3 className="CurrentUser__name">{(user as User).name}</h3>
        <p className="CurrentUser__email">{(user as User).email}</p>
        <p className="CurrentUser__phone">{(user as User).phone}</p>
        <button
          className="CurrentUser__button"
          type="button"
          onClick={clearUser}
        >
          Clear selected user
        </button>
      </div>
    );
  }
}
