import React from 'react';
import './CurrentUser.scss';

import { getAllUsers } from '../../Api/api';

type Props = {
  selectedUserId: number;
  getSelectedUserId: (id: number) => void;
};

type State = {
  user: User;
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {
      id: 0,
      name: '',
      email: '',
      phone: '',
    },
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prev: Props) {
    if (prev.selectedUserId !== this.props.selectedUserId) {
      this.loadData();
    }
  }

  async loadData() {
    const user = await getAllUsers(this.props.selectedUserId);

    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const { selectedUserId, getSelectedUserId } = this.props;

    return (
      <div className="CurrentUser">
        {user && (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUserId}`}</span></h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </>
        )}
        <button
          type="button"
          onClick={() => getSelectedUserId(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}
