import React from 'react';
import './CurrentUser.scss';

import { getSelectedUserDetails } from '../../api/todos';

type Props = {
  selectedUserId: number,
  clearSelectedUser: () => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    const user = await getSelectedUserDetails(this.props.selectedUserId);

    this.setState({ user });
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const user = await getSelectedUserDetails(this.props.selectedUserId);

    this.setState({ user });
  }

  render(): React.ReactNode {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {'Selected user: '}
            {this.props.selectedUserId}
          </span>
        </h2>
        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
        <button
          type="button"
          className="TodoList__user-button TodoList__user-button--selected
          button"
          onClick={() => (
            this.props.clearSelectedUser()
          )}
        >
          Clear
        </button>
      </div>
    );
  }
}
