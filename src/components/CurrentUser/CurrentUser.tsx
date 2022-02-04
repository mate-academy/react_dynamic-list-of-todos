import React from 'react';
import './CurrentUser.scss';
import { getUserById } from '../../api/api';

type Props = {
  userId: number,
  clearSelectedUser: () => void,
};

type State = {
  selectedUser: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    selectedUser: null,
  };

  componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      this.loadUsers();
    }
  }

  async loadUsers() {
    const selectedUser = await getUserById(this.props.userId);

    this.setState({ selectedUser });
  }

  render() {
    const { selectedUser } = this.state;

    return (
      <>
        {selectedUser && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${selectedUser.id}`}</span>
            </h2>
            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>
            <button
              className="button"
              type="button"
              onClick={this.props.clearSelectedUser}
            >
              Clear
            </button>
          </div>
        )}
      </>
    );
  }
}
