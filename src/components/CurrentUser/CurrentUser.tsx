import React from 'react';
import './CurrentUser.scss';
import { loadUserAsync } from '../../api';

interface Props {
  userId: number;
  reset: () => void;
}

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.reloadUser(this.props.userId);
  }

  async componentDidUpdate(prevPrors: Props) {
    if (prevPrors.userId !== this.props.userId) {
      this.reloadUser(this.props.userId);
    }
  }

  async reloadUser(userId: number) {
    const user = await loadUserAsync(userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <div>User not found</div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          className="button CurrentUser__clear"
          onClick={this.props.reset}
        >
          Clear
        </button>
      </div>
    );
  }
}
