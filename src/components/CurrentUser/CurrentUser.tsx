import React from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

interface Props {
  selectedUserId: number;
  resetUser: () => void
}

type State = {
  user: User | null;
};
export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.loadUser();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedUserId !== this.props.selectedUserId) {
      this.loadUser();
    }
  }

  loadUser = async () => {
    const { selectedUserId } = this.props;
    const user = await getUser(selectedUserId);

    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    const { resetUser } = this.props;

    if (!user) {
      return (
        <div className="CurrentUser">
          <span>User not found</span>
        </div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${user.id}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          className="button button--reset"
          type="button"
          onClick={resetUser}
        >
          Reset
        </button>
      </div>
    );
  }
}
