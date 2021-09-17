import React from 'react';
import './CurrentUser.scss';
import { loadUsers } from '../../api';

type State = {
  user: User | null,
};

interface Props {
  userId: number,
  clear: () => void,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    const user = await loadUsers(this.props.userId);

    this.setState({
      user,
    });
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      const user = await loadUsers(this.props.userId);

      // eslint-disable-next-line
      this.setState({
        user,
      });
    }
  }

  render() {
    const { user } = this.state;
    const { clear } = this.props;

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
          className="btn btn-secondary"
          onClick={clear}
        >
          clear
        </button>
      </div>
    );
  }
}
