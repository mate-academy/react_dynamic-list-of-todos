import React from 'react';
import { getUserInfo } from '../../api/api';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import './CurrentUser.scss';

type Props = {
  userId: User['id'];
  clearSelectedUser: () => void;
};

type State = {
  currentUser: User | null;
  isLoading: boolean;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    currentUser: null,
    isLoading: false,
  };

  componentDidMount() {
    this.loadCurrentUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadCurrentUser();
    }
  }

  loadCurrentUser = async () => {
    this.setState({
      isLoading: true,
    });

    try {
      const user: User = await getUserInfo(this.props.userId);

      this.setState({
        currentUser: user,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(
        'An error has occurred when loading user info from the server',
      );
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { userId, clearSelectedUser } = this.props;
    const { currentUser, isLoading } = this.state;

    return (
      <div className="CurrentUser">
        {isLoading && <Loader />}

        {currentUser && (
          <>
            <h2 className="CurrentUser__title">
              <span>
                {'Selected user: '}
                {userId}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{currentUser.name}</h3>
            <p className="CurrentUser__email">{currentUser.email}</p>
            <p className="CurrentUser__phone">{currentUser.phone}</p>

            <button
              className="button"
              type="button"
              onClick={clearSelectedUser}
            >
              Clear
            </button>
          </>
        )}
      </div>
    );
  }
}
