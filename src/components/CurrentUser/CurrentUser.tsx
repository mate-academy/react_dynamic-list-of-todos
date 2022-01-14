import React from 'react';
import { loadUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  clear: () => void;
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.getUser();
  }

  async componentDidUpdate(prevProps: Props) {
    const { selectedUserId } = this.props;

    if (prevProps.selectedUserId !== selectedUserId) {
      this.getUser();
    }
  }

  getUser = async () => {
    const { selectedUserId } = this.props;
    const user = await loadUser(selectedUserId);

    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    const { selectedUserId, clear } = this.props;

    if (!user) {
      return (
        <p>User not found</p>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${selectedUserId}`}</span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          type="button"
          onClick={clear}
        >
          Clear
        </button>
      </div>
    );
  }
}
