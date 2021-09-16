import React from 'react';
import { loadUsers } from '../../api/api';
import './CurrentUser.scss';

type State = {
  user: User | null,
};

type Props = {
  userId: number,
  onClearUserId: () => void,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getLoadedData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.getLoadedData();
    }
  }

  async getLoadedData() {
    const { userId } = this.props;
    const user = await loadUsers(userId);

    this.setState(() => ({
      user,
    }));
  }

  render() {
    const { user } = this.state;
    const { onClearUserId } = this.props;

    return (
      <>
        {user ? (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user.id}`}</span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              type="button"
              className="TodoList__user-button--selected button"
              onClick={() => onClearUserId()}
            >
              Clear
            </button>
          </div>
        ) : 'There is no such user'}
      </>
    );
  }
}
