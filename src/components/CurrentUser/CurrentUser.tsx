import React from 'react';
import './CurrentUser.scss';

import { User } from '../../types/User';

import { getUser } from '../../api/api';

type Props = {
  userId: number,
  clearUser: () => void,
};

type State = {
  user: User | null,
  errorMessage: string,
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {
      id: 1,
      createdAt: '',
      updatedAt: '',
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    },
    errorMessage: '',
  };

  async componentDidMount() {
    this.loadUserFromServer();
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUserFromServer();
    }
  }

  loadUserFromServer = async () => {
    try {
      const user = await getUser(this.props.userId);

      this.setState({ user, errorMessage: '' });
    } catch (error) {
      this.setState({ user: null, errorMessage: 'User was not found' });
    }
  };

  render() {
    const { user, errorMessage } = this.state;

    if (!user) {
      return (
        <>
          <p>Loading User...</p>
        </>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {this.props.userId}
          </span>
        </h2>
        {user ? (
          <>
            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>

            <button
              className="CurrentUser__button button"
              type="button"
              onClick={this.props.clearUser}
            >
              Clear
            </button>
          </>
        ) : (
          <p>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
}
