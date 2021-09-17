import React from 'react';
import './CurrentUser.scss';
import { loadUsers } from '../../api';

interface Props {
  userId: number,
  handleClick: (userId: number) => void,
}

interface State {
  user: User | null;
}

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
    const user = await loadUsers(userId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    const { handleClick } = this.props;

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

        <h3 className="CurrentUser__name">
          {user.name}
        </h3>
        <p className="CurrentUser__email">
          {user.email}
        </p>
        <p className="CurrentUser__phone">
          {user.phone}
        </p>

        <button
          className="button-clear"
          type="button"
          onClick={() => handleClick(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}
