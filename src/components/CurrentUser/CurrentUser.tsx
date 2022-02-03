import React from 'react';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  removeUser: () => void;
};

type State = {
  user: User | null,
};

export class CurrentUser extends React.Component<Props, State> {
  state: State = {
    user: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.loadUser();
    }
  }

  async loadUser() {
    const user: User = await getUser(this.props.userId);

    this.setState({
      user,
    });
  }

  render() {
    if (!this.state.user) {
      return (
        <span>
          No user
        </span>
      );
    }

    const {
      name,
      id,
      email,
      phone,
    } = this.state.user;

    return (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {id}
          </span>
        </h2>
        <h3 className="CurrentUser__name">
          {name}
        </h3>
        <p className="CurrentUser__email">
          {email}
        </p>
        <p className="CurrentUser__phone">
          {phone}
        </p>

        <button
          type="button"
          onClick={this.props.removeUser}
        >
          Clear
        </button>
      </div>
    );
  }
}
