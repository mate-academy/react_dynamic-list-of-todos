import React from 'react';
import { loadUser } from '../../api/api';
import './CurrentUser.scss';

interface Props {
  userId: number;
  onUserClear: () => void;
}

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.reloadUser(this.props.userId);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.reloadUser(this.props.userId);
    }
  }

  async reloadUser(userId: number) {
    const user = await loadUser(userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { onUserClear } = this.props;

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
            {` ${user.name}`}
          </span>
          <button
            type="button"
            className="button"
            onClick={onUserClear}
          >
            Clear
          </button>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    );
  }
}
