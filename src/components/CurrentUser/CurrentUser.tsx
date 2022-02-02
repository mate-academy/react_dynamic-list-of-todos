import React from 'react';
import './CurrentUser.scss';

import { getAllUsers } from '../../Api/api';

type Props = {
  selectedUserId: number;
  functSelectUser: (id: number) => void;
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
    const usr = await getAllUsers(this.props.selectedUserId);

    this.setState({ user: usr });
  }

  render() {
    const { user } = this.state;
    const { selectedUserId, functSelectUser } = this.props;

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
          onClick={() => functSelectUser(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}
