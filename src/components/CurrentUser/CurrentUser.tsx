import React from 'react';
import './CurrentUser.scss';

import { getUser } from '../../api';

type Props = {
  userId: number,
  clearUser: () => void,
};

type State = {
  user: User | null,
  hasLoadError: boolean,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    hasLoadError: false,
  };

  componentDidUpdate(prevProps: Props) {
    const { userId } = this.props;

    if (prevProps.userId !== userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const { userId } = this.props;

    try {
      const user = await getUser(userId);

      this.setState({
        user,
        hasLoadError: false,
      });
    } catch (error) {
      this.setState({ hasLoadError: true });
    }
  }

  render() {
    const { user, hasLoadError } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        {hasLoadError
          ? <div>User not found</div>
          : (
            <div>
              <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

              <h3 className="CurrentUser__name">{user?.name}</h3>
              <p className="CurrentUser__email">{user?.email}</p>
              <p className="CurrentUser__phone">{user?.phone}</p>

              <button
                type="button"
                className="TodoList__user-button
                TodoList__user-button--selected
                button"
                onClick={() => clearUser()}
              >
                Clear
              </button>
            </div>
          )}
      </div>
    );
  }
}
