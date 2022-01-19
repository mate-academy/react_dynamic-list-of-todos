import React from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api/api';

interface User {
  id: number,
  name: string,
  email: string,
  phone: string,
}

type State = {
  user: User | null,
};

type Props = {
  userId: number,
  clearSelectedUser: () => void,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loader();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loader();
    }
  }

  loader = async () => {
    const selectedUser = await getUser(this.props.userId);

    this.setState({ user: selectedUser });
  };

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <h2>No user data</h2>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={() => this.props.clearSelectedUser()}
        >
          CLEAR
        </button>
      </div>
    );
  }
}
