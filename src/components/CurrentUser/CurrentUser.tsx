import React from 'react';
import './CurrentUser.scss';
import { User } from '../../types/User';
import { getData } from '../../api/api';

interface Props {
  userId: number,
  clearSelectedUser: () => void,
}

interface State {
  user: User | null,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    const userEndpoint = `/users/${this.props.userId}`;

    getData<User>(userEndpoint)
      .then(user => {
        this.setState({ user });
      });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      const userEndpoint = `/users/${this.props.userId}`;

      getData<User>(userEndpoint)
        .then(user => {
          this.setState({ user });
        });
    }
  }

  render() {
    const { user } = this.state;
    const { clearSelectedUser } = this.props;

    return (
      user ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:&nbsp;
              {user.id}
            </span>
          </h2>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            className="CurrentUser__clear button"
            type="button"
            onClick={() => clearSelectedUser()}
          >
            Clear
          </button>
        </div>
      ) : (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>User not found</span>
          </h2>
          <button
            className="CurrentUser__clear button"
            type="button"
            onClick={() => clearSelectedUser()}
          >
            Clear
          </button>
        </div>
      )
    );
  }
}
