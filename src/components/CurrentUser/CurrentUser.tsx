import React from 'react';
import { getUsers } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  clearSelectedUser: () => void,
};

interface User {
  id: number,
  name: string,
  email: string,
  phone: number,
}

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.loadUser(this.props.userId);
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser(this.props.userId);
    }
  }

  async loadUser(userId: number) {
    let user;

    try {
      user = await getUsers(userId);
    } catch (error) {
      this.setState({ user: null });

      return;
    }

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { clearSelectedUser } = this.props;

    if (user) {
      return (
        <>
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                {`Selected user: ${user.id}`}
              </span>
            </h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>
          <button
            className="button CurrentUser__clear"
            type="button"
            onClick={clearSelectedUser}
          >
            Clear
          </button>
        </>
      );
    }

    return (
      <h2>
        User is not found
      </h2>
    );
  }
}
