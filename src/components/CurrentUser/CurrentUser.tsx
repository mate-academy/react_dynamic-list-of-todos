import React from 'react';
import './CurrentUser.scss';
import { currentUser } from '../../api/todos';

type Props = {
  clearUserDetails: () => void;
  userId: number,
};

type State = {
  user: User,
};

export class CurrentUser extends React.Component<Props, State> {
  state = {
    user: {
      id: 0,
      name: '',
      email: '',
      phone: '',
    },
  };

  async componentDidMount() {
    const user = await currentUser(this.props.userId);

    this.setState({ user });
  }

  render() {
    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            {`Selected user: ${this.props.userId}`}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{this.state.user.name}</h3>
        <p className="CurrentUser__email">{this.state.user.email}</p>
        <p className="CurrentUser__phone">{this.state.user.phone}</p>

        <button
          className="
            TodoList__user-button
            TodoList__user-button--selected
            button
          "
          type="button"
          onClick={this.props.clearUserDetails}
        >
          Clear
        </button>
      </div>
    );
  }
}
