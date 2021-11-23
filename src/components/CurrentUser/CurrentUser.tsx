import React from 'react';
import { getUserById } from '../../api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  unselectUser: () => void,
};

interface State {
  user: User | null,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.selectedUserId !== prevProps.selectedUserId) {
      this.loadUser();
    }
  }

  loadUser = () => {
    try {
      getUserById(this.props.selectedUserId)
        .then((user) => {
          this.setState({ user });
        });
    } catch {
      this.setState({ user: null });
    }
  };

  render() {
    const { user } = this.state;

    return (
      <>
        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
        <button
          onClick={() => this.props.unselectUser()}
          type="button"
          className="button"
        >
          Clear users
        </button>
      </>
    );
  }
}
