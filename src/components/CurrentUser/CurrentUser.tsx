import React from 'react';
import './CurrentUser.scss';
import { loadUser } from '../../api/api';

interface Props {
  userId: number;
  clearUser: () => void;
}

interface State {
  user: User | null;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    const user = await loadUser(this.props.userId);

    this.setState({
      user,
    });
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.reloadUser(this.props.userId);
    }
  }

  async reloadUser(userId: number) {
    const user = await loadUser(userId);

    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    if (!user) {
      return (
        <div>No user selected</div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {user.id}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>

        <button type="button" className="btn btn-primary" onClick={() => clearUser()}>Clear User</button>
      </div>
    );
  }
}
