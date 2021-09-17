import React from 'react';
import { loadUsers } from '../../api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  clear: () => void;
};

type State = {
  selectedUser: User | null
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    selectedUser: null,
  };

  async componentDidMount() {
    await this.loadUsers();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUsers();
    }
  }

  async loadUsers() {
    const selectedUser = await loadUsers(this.props.selectedUserId);

    this.setState({ selectedUser });
  }

  render() {
    const { selectedUser } = this.state;

    return (
      selectedUser && (
        <>
          <div className="CurrentUser">
            <h2 className="CurrentUser__title"><span>{selectedUser.id}</span></h2>

            <h3 className="CurrentUser__name">{selectedUser.name}</h3>
            <p className="CurrentUser__email">{selectedUser.email}</p>
            <p className="CurrentUser__phone">{selectedUser.phone}</p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.props.clear}
          >
            Clear
          </button>
        </>
      )
    );
  }
}
