import { Component } from 'react';
import { loadData } from '../../api/api';

import './CurrentUser.scss';

type Props = {
  userId: number,
  clearUser: () => void,
};

type State = {
  user: User | null,
};

export class CurrentUser extends Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.getUserInfo();
  }

  componentDidUpdate(prev: Props) {
    const { userId } = this.props;

    if (prev.userId !== userId) {
      this.getUserInfo();
    }
  }

  getUserInfo = () => {
    const { userId } = this.props;

    loadData(`users/${userId}`)
      .then((user: User) => this.setState({ user }));
  };

  render() {
    const { user } = this.state;
    const { clearUser } = this.props;

    return (
      <div className="CurrentUser">
        <button
          onClick={clearUser}
          className="
            TodoList__user-button
            TodoList__user-button--selected
            button
          "
          type="button"
        >
          Clear tab
        </button>
        <h2 className="CurrentUser__title"><span>User data:</span></h2>

        <h3 className="CurrentUser__name">{user?.name}</h3>
        <p className="CurrentUser__email">{user?.email}</p>
        <p className="CurrentUser__phone">{user?.phone}</p>
      </div>
    );
  }
}
