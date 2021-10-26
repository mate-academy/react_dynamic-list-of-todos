import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

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

    if (!user) {
      return (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>User not found</span></h2>
          <button
            type="button"
            className="button TodoList__user-button"
            onClick={this.props.clearUser}
          >
            Remove selected user
          </button>
        </div>
      );
    }

    return user && (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${(user as User).id}`}</span></h2>

        <h3 className="CurrentUser__name">{(user as User).name}</h3>
        <p className="CurrentUser__email">{(user as User).email}</p>
        <p className="CurrentUser__phone">{(user as User).phone}</p>
        <button
          type="button"
          className="button CurrentUser__user-button"
          onClick={this.props.clearUser}
        >
          Remove selected user
        </button>
      </div>
    );
  }
}
