import React from 'react';
import './CurrentUser.scss';

import { getUser } from '../../Api/api';

type Props = {
  selectedUserId: number;
  getSelectedUserId: (id: number) => void;
};

type State = {
  user: User;
  error: boolean;
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {
      id: 0,
      name: '',
      email: '',
      phone: '',
    },
    error: false,
  };

  async componentDidMount() {
    this.loadData();
  }

  async componentDidUpdate(prev: Props) {
    if (prev.selectedUserId !== this.props.selectedUserId) {
      this.loadData();
    }
  }

  async loadData() {
    try {
      const user = await getUser(this.props.selectedUserId);

      this.setState({ user, error: false });
    } catch (error) {
      this.setState({ error: true });
    }
  }

  render() {
    const { user, error } = this.state;
    const { selectedUserId, getSelectedUserId } = this.props;

    return (
      <div className="CurrentUser">
        {!error ? (
          <>
            <h2 className="CurrentUser__title"><span>{`Selected user: ${selectedUserId}`}</span></h2>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </>
        ) : <p>User not faund...</p>}
        <button
          className="
          TodoList__user-button
          TodoList__user-button--selected
          button
        "
          type="button"
          onClick={() => getSelectedUserId(0)}
        >
          Clear
        </button>
      </div>
    );
  }
}
