import React from 'react';
import { getUserById } from '../../api/api';
import './CurrentUser.scss';

interface Props {
  userId: number,
  clearUserInfo: () => void,
}

interface State {
  user: User | null,
  isLoadUserError: boolean,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    isLoadUserError: false,
  };

  componentDidMount() {
    this.loadUserData();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserData();
    }
  }

  async loadUserData() {
    try {
      this.setState({ isLoadUserError: false });
      const user = await getUserById(this.props.userId);

      this.setState({ user });
    } catch (error) {
      this.setState({ user: null, isLoadUserError: true });
    }
  }

  render() {
    const { user, isLoadUserError } = this.state;

    return (
      <div>
        {user && (
          <div className="CurrentUser">

            <h2 className="CurrentUser__title">
              <span>{`Selected user: ${user.id}`}</span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              type="button"
              className="CurrentUser__clear"
              onClick={this.props.clearUserInfo}
            >
              Clear
            </button>
          </div>
        )}

        {isLoadUserError && (
          <div className="alert alert-danger" role="alert">
            An error occured when loading user info!
          </div>
        )}
      </div>
    );
  }
}
