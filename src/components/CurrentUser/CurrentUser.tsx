import React from 'react';
import './CurrentUser.scss';
import { User } from '../types/User';
import { getUsers } from '../../api/api';

type State = {
  user: User | null,
};

type Props = {
  selectedUserId: number,
  clearUser: () => void,
  userSelected: (userId: number) => void,
};

export class CurrentUser extends React.Component<Props, {}> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUser();
    }
  }

  async loadUser() {
    try {
      const user = await getUsers(this.props.selectedUserId);

      this.setState({ user });
    } catch (error) {
      this.props.clearUser();
    }
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: #${user?.id}`}</span>
        </h2>

        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
        <button
          type="button"
          className="button CurrentUser__clear"
          onClick={() => this.props.clearUser()}
        >
          Clear
        </button>
      </div>
    );
  }
}
