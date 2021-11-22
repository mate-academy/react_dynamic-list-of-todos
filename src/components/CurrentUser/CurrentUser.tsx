import React from 'react';
import { getUserByID } from '../../api';
import './CurrentUser.scss';

interface Props {
  userId: number,
  clearSelection: () => void,
}

interface State {
  user: User | null,
  errorMessage: boolean
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
    errorMessage: false,
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  componentDidUpdate(prevProps: { userId: number; }) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserInfo();
    }
  }

  async loadUserInfo() {
    try {
      const user: User = await getUserByID(this.props.userId);

      this.setState({
        user,
        errorMessage: false,
      });
    } catch (error) {
      this.setState({
        user: null,
        errorMessage: true,
      });
    }
  }

  render() {
    const { user, errorMessage } = this.state;

    return (
      <div>
        {errorMessage && (
          <h2>There is no such user</h2>
        )}
        {user && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span className="CurrentUser__title--span">
                {`Selected user: ${user.id}`}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{`${user.name} ${user.username}`}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              type="button"
              className="button"
              onClick={this.props.clearSelection}
            >
              Clear user
            </button>
          </div>
        )}
      </div>
    );
  }
}
