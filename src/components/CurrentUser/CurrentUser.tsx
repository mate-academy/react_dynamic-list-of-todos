import React from 'react';
import './CurrentUser.scss';
import { getFromServer } from '../../api/api';
import { User } from '../../react-app-env';

type Props = {
  selectedUser: number;
  onUnselect: () => void;
};

type State = {
  user: User | null
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.selectedUser !== this.props.selectedUser) {
      this.loadUser();
    }
  }

  async loadUser() {
    const currentUserId = this.props.selectedUser;
    const userFromServer = await getFromServer(`/users/${currentUserId}`) as User;

    this.setState({ user: userFromServer });
  }

  render() {
    const { user } = this.state;
    const { onUnselect } = this.props;

    return (
      <div className="CurrentUser">
        <button
          onClick={onUnselect}
          type="button"
          className="button is-primary"
        >
          X
        </button>
        <h2 className="CurrentUser__title"><span>{user ? `Selected user: ${user?.id}` : 'No such user'}</span></h2>

        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>

      </div>
    );
  }
}
