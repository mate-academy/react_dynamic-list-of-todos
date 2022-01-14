/* eslint-disable no-console */
import React from 'react';
import './CurrentUser.scss';
import { getUsers } from '../../api/api';

interface Props {
  userId: number;
  onClear(): void;
}

interface State {
  user: User | null;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadCurrentUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadCurrentUser();
    }
  }

  loadCurrentUser() {
    getUsers(this.props.userId)
      .then(user => {
        this.setState({ user });
      })
      .catch(error => {
        console.warn(error);
      });
  }

  render() {
    const { user } = this.state;
    const { userId, onClear } = this.props;

    return (
      <>
        {user && (
          <div className="CurrentUser">
            <h2 className="CurrentUser__title">
              <span>
                {`Selected user: ${userId}`}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
          </div>
        )}

        <button type="button" className="button" onClick={onClear}>
          Clear
        </button>
      </>
    );
  }
}
