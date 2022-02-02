import React from 'react';
import { getUsers } from '../../Api';
import './CurrentUser.scss';

interface Props {
  userId: number,
  selectUserId: (id: number) => void,
}

interface State {
  user: User,
}

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: {} as User,
  };

  componentDidMount() {
    this.handleFetch();
  }

  componentDidUpdate(_: Props, prevState: State) {
    if (this.state.user !== prevState.user) {
      this.handleFetch();
    }
  }

  async handleFetch() {
    const user = await getUsers(this.props.userId);

    this.setState({ user });
  }

  resetUser = () => {
    this.props.selectUserId(0);
    this.setState({ user: {} as User });
  };

  render() {
    const { user } = this.state;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
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
          style={{ marginLeft: '115px', marginTop: '10px' }}
          onClick={this.resetUser}
        >
          Clear
        </button>
      </div>
    );
  }
}
