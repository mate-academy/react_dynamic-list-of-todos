import React from 'react';
import './CurrentUser.scss';
import { loadUser } from '../../api';

type Props = {
  userId: number;
  userClear: () => void;
};

interface State {
  user: User | null;
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.reloadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.reloadUser();
    }
  }

  async reloadUser() {
    const user = await loadUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    const { userClear } = this.props;
    const { user } = this.state;

    if (!user) {
      return (
        <div>User not found</div>
      );
    }

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
          <button
            type="submit"
            className="button button--clear"
            onClick={userClear}
          >
            Clear
          </button>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
      </div>
    );
  }
}
