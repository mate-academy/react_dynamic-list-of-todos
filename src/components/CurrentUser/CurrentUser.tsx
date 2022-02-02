import React from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  selectUser: (id: number) => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prev: Props) {
    if (this.props.userId !== prev.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const user: User = await getUser(this.props.userId);

    this.setState({ user });
  }

  render(): React.ReactNode {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>

        <button
          type="button"
          onClick={() => this.props.selectUser(0)}
          className="TodoList__user-button button"
        >
          Clear
        </button>
      </div>
    );
  }
}
