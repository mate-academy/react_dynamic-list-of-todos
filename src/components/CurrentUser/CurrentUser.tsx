import React from 'react';
import { User } from '../../Types';
import './CurrentUser.scss';
import { promise } from '../../API/api';

type Props = {
  userId: number,
  clearUser: () => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prev: Props) {
    if (prev.userId !== this.props.userId) {
      this.getUserData();
    }
  }

  getUserData = () => {
    promise(`users/${this.props.userId}`)
      .then((user: User) => this.setState({ user }));
  };

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <button
          onClick={this.props.clearUser}
          className="
            TodoList__user-button
            TodoList__user-button--selected
            button
          "
          type="button"
        >
          Clear user
        </button>
        <h2 className="CurrentUser__title"><span>Selected user:</span></h2>

        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
      </div>
    );
  }
}
