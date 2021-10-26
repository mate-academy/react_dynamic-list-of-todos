import React from 'react';
import { getUser } from '../../api/api';
import { User } from '../../react-app-env';
import './CurrentUser.scss';

interface Props {
  userId: number,
  clearUser: () => void,
}
interface State {
  user: User | null,
}
export class CurrentUser extends React.Component<Props, State> {
  state:State = {
    user: null,
  };

  async componentDidMount() {
    this.updateUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.userId !== prevProps.userId) {
      this.updateUser();
    }
  }

  updateUser() {
    getUser(this.props.userId).then(user => this.setState({ user }));
  }

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user?.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
        <button
          type="button"
          className="button"
          onClick={this.props.clearUser}
        >
          clear
        </button>
      </div>
    );
  }
}
