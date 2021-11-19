import React from 'react';
import { getUser } from '../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  onClear: () => void,
};

type State = {
  user: User,
  userError: boolean,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: {
      id: 0,
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
    },
    userError: false,
  };

  async componentDidMount() {
    this.loadUsers();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      this.loadUsers();
    }
  };

  loadUsers = async () => {
    try {
      const user = await getUser(this.props.userId);

      this.setState({ user, userError: false });
    } catch {
      this.setState({ userError: true });
    }
  }

  render() {
    return (
      !this.state.userError ? (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
              {this.state.user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{this.state.user.name}</h3>
          <p className="CurrentUser__email">{this.state.user.email}</p>
          <p className="CurrentUser__phone">{this.state.user.phone}</p>
          <button
            type="button"
            className="button"
            onClick={() => {
              this.props.onClear();
            }}
          >
            clear
          </button>
        </div>
      ) : (
        `User with id #${this.props.userId} doesn't exist`
      )
    );
  }
}
// `User with id #${this.props.userId} doesn't exist`
