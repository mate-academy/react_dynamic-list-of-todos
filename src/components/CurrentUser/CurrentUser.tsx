import React from 'react';
import './CurrentUser.scss';
import { loadUser } from '../../api/api';

type Props = {
  selectedUserId: number;
  clear: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate(prevProps: Props) {
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
    const { selectedUserId, clear } = this.props;
    const { user } = this.state;

    if (!user) {
      return (
        <div>
          No user yet
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${selectedUserId}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button
          className="CurrentUser__clear"
          type="button"
          onClick={clear}
        >
          Clear
        </button>
      </div>
    );
  }
}
