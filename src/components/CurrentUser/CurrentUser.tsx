import React from 'react';
import './CurrentUser.scss';
import { User } from '../../types/User';
import { getUser } from '../../api/api';

type State = {
  user: User | null;
  isLoaded: boolean;
};

type Props = {
  selectedUserId: number;
  clearUser: () => void;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    isLoaded: false,
  };

  async componentDidMount() {
    await this.getUserFromServer();
  }

  async componentDidUpdate(prevProps: Readonly<Props>) {
    const { selectedUserId } = this.props;

    if (selectedUserId !== prevProps.selectedUserId) {
      await this.getUserFromServer();
    }
  }

  getUserFromServer = async () => {
    try {
      const { selectedUserId } = this.props;

      this.setState({ isLoaded: false });
      const user = await getUser(selectedUserId);

      this.setState({
        user,
        isLoaded: true,
      });
    } catch (error) {
      this.setState({ user: null });
    }
  };

  render() {
    const { user, isLoaded } = this.state;
    const { clearUser } = this.props;

    return (
      <>
        {isLoaded
          ? (
            <div className="CurrentUser">
              <h2 className="CurrentUser__title"><span>{`Selected user: ${user?.id}`}</span></h2>

              <h3 className="CurrentUser__name">{user?.name}</h3>
              <p className="CurrentUser__email">{user?.email}</p>
              <p className="CurrentUser__phone">{user?.phone}</p>
              <button
                type="button"
                onClick={clearUser}
                className="CurrentUser__button"
              >
                Clear
              </button>
            </div>
          )
          : <span>Is Loading...</span>}
      </>
    );
  }
}
