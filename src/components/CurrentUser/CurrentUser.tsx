import React from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

type Props = {
  selectedUserId: number;
  clearUser: (userId: number) => void;
};

type State = {
  currentUser: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    currentUser: null,
  };

  async componentDidMount() {
    await this.setUser();
  }

  async componentDidUpdate(prevProps: Props) {
    const { selectedUserId } = this.props;

    if (selectedUserId !== prevProps.selectedUserId) {
      await this.setUser();
    }
  }

  async setUser() {
    const { selectedUserId } = this.props;
    const user = await getUser(selectedUserId);

    this.setState({ currentUser: user });
  }

  render() {
    const { currentUser } = this.state;
    const { selectedUserId, clearUser } = this.props;

    return currentUser && (
      <div className="CurrentUser">
        <button
          type="button"
          className="button"
          onClick={() => clearUser(0)}
        >
          Clear
        </button>
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {selectedUserId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{currentUser.name}</h3>
        <p className="CurrentUser__email">{`Email: ${currentUser.email}`}</p>
        <p className="CurrentUser__phone">{`Phone: ${currentUser.phone}`}</p>
      </div>
    );
  }
}
