import React from 'react';
import './CurrentUser.scss';
import { fetchUser } from '../../api';

type Props = {
  userId: number;
  onCleanButton: () => void;
};

type State = {
  user: User | null;
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  async componentDidMount() {
    this.reloadUser(this.props.userId);
  }

  async componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.reloadUser(this.props.userId);
    }
  }

  async reloadUser(userId: number) {
    const user = await fetchUser(userId);

    this.setState({
      user,
    });
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return (
        <div>User not found</div>
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
        <button
          className="
            TodoList__user-button
            TodoList__user-button--selected
            button
          "
          type="button"
          onClick={this.props.onCleanButton}
        >
          Clear user
        </button>
      </div>
    );
  }
}
